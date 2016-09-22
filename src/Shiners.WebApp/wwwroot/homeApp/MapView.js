import Marionette from 'backbone.marionette';
import template from './MapView.hbs.html';
import SearchView from './SearchView.js';
import ShinerInfoView from './ShinerInfoView.js';
import MapLoader from 'load-google-maps-api';
import _ from 'underscore';
import app from './app.js';
var View = Marionette.View.extend({
    tagName:'section',
    className:'map-section',
    template:template,
    map:null,
    shiners:[],
    mapInfoWindow:null,
    fetchTimeOut:null,
    regions: {
        search:'#searchView'
    },
    initialize() {
        this.listenTo(this.collection,'after:load',this.showShiners);
    },
    onRender() {
        this.showChildView('search', new SearchView());
        setTimeout(_.bind(this.initMap,this),500);
    },

    showShiners() {
        var image = {
            url: '../images/shiners/default_32.png',
            size: new window.google.maps.Size(32, 32),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(0, 32)
        };
        this.collection.each((model) => {         
            if (!_.find(this.shiners, (sh) => sh.modelId===model.id)) {
                var details = model.get('details');
                _.each(details.locations, (location) => {
                    var shiner = new window.google.maps.Marker({
                        position: {lat: location.coords.lat, lng: location.coords.lng},
                        map: this.map,
                        icon: image,
                        title: details.title
                    });
                    shiner.modelId = model.id;
                    shiner.addListener('click', _.bind(this.shinerInfo,this,shiner,model));
                    this.shiners.push(shiner);
                }, this);
            }
        },this);
    },

    shinerInfo(shiner,model,event) {
        this.infoView = new ShinerInfoView({model:model});
        var infoView = this.infoView;
        var infoWindow = new window.google.maps.InfoWindow({
            content: infoView.render().$el[0]
        });
        infoWindow.addListener('closeclick',() => infoView.remove());
        window.google.maps.event.addListener(infoWindow,'domready',() => infoView.delegateMapEvent());
        infoWindow.open(this.map, shiner);
        this.once('before:destroy',this.infoView.remove,this.infoView);
    },

    initMap() {
        // AIzaSyB6JoRSeKMn_yjz3Oip84N9YhX7B6djHLA - api key geolocation
        MapLoader({key:'AIzaSyCqCn84CgZN6o1Xc3P4dM657HIxkX3jzPY'}).then( _.bind((maps) => {           
            this.map = new maps.Map(document.getElementById('map2'),
            {
                center: { lat: 55.75396, lng: 37.620393 },
                zoom: 14,
                scrollwheel: false
            });
            app.map = this.map;
            this.map.addListener('bounds_changed',_.bind(this.onBoundsChange,this));
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( _.bind(this.setMapPosition,this),  _.bind(this.setMapPosition,this,{ coords: {latitude:55.75396,longitude:37.620395} }));
            } else {
                this.fetchPosts();
            }
        },this) );
    },

    setMapPosition(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.map.setCenter(pos);
    },

    onBoundsChange() {
        if (this.fetchTimeOut)
            clearTimeout(this.fetchTimeOut);
        this.fetchTimeOut = setTimeout(_.bind( ()=> {
            this.fetchPosts();
        }, this), 500);
    },

    fetchPosts() {
        if (this.map.getZoom()>12) {
            var center = this.map.getCenter();
            this.collection.loadByMethod('getNearbyPosts',[center.lat(),center.lng()]);
        }
    }
});
export default View;