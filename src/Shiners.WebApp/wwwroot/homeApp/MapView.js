import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import template from './MapView.hbs.html';
import SearchView from './search/SearchView.js';
import ShinerInfoView from './ShinerInfoView.js';
import MapLoader from 'load-google-maps-api';
import _ from 'underscore';
import app from './app.js';
var View = Marionette.View.extend({
    tagName:'section',
    className:'map-section',
    template:template,
    map:null,
    model:null,
    shiners:[],
    mapInfoWindow:null,
    fetchTimeOut:null,
    regions: {
        search:'#searchView'
    },
    initialize() {
        this.model = new Backbone.Model(); // search model
    },

    modelEvents: {
        'change':'fetchPosts'
    },

    collectionEvents: {
        'after:load':'showShiners'
    },

    onRender() {
        this.showChildView('search', new SearchView({collection:this.collection,model:this.model}));
        setTimeout(_.bind(this.initMap,this),500);
    },

    showShiners() {
        var image = {
            url: '../images/shiners/default_32_blue.png',
            size: new window.google.maps.Size(35, 46),
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
        for(var i = this.shiners.length; i--;) {
            if(!this.collection.get(this.shiners[i].modelId)) {
                this.shiners[i].setMap(null);
                this.shiners.splice(i, 1);
            }
        }
    },

    shinerInfo(shiner,model,event) {
        if (this.infoView) {
            this.infoView.remove();
            this.infoView = null;
        }
        if (this.googleWindow) {
            this.googleWindow.close();
            this.googleWindow = null;
        }
        this.infoView = new ShinerInfoView({model:model});
        var infoView = this.infoView;
        this.googleWindow = new window.google.maps.InfoWindow({
            content: infoView.render().$el[0]
        });
        this.googleWindow.addListener('closeclick',() => infoView.remove());
        window.google.maps.event.addListener(this.googleWindow,'domready',() => infoView.delegateMapEvent());
        this.googleWindow.open(this.map, shiner);
        this.once('before:destroy',this.infoView.remove,this.infoView);
    },

    initMap() {
        MapLoader({key:'AIzaSyCqCn84CgZN6o1Xc3P4dM657HIxkX3jzPY'}).then( _.bind((maps) => {
            var center = app.user.get('location') || { lat: 55.75396, lng: 37.620393 };
            this.map = new maps.Map(document.getElementById('map2'),
            {
                center: center,
                zoom: 14,
                scrollwheel: false
            });
            app.map = this.map;
            this.map.addListener('bounds_changed',_.bind(this.onBoundsChange,this));
            //if (window.navigator&&window.navigator.geolocation) {
            //    navigator.geolocation.getCurrentPosition( _.bind(this.setMapPosition,this),  _.bind(this.setMapPosition,this,{ coords: {latitude:55.75396,longitude:37.620395} }));
            //} else {
            //    this.model.set({ position: center });
            //}
        },this));
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
            
            if (this.map.getZoom()>12) {
                var center = this.map.getCenter();
                this.model.set({
                    position: {
                        lat:center.lat(),
                        lng:center.lng()
                    }
                });
            }
        }, this), 500);
    },

    fetchPosts() {
        var query = this.model.get('query'),
            method='getNearbyPostsTest',
            activeCats=this.model.get('activeCats'),
            args=[],
            radius = this.model.get('radius')||7;
        if ((query && !_.isEmpty(query.trim()))||(activeCats&&!_.isEmpty(activeCats))) {
            method = 'searchPosts';
            args.push({
                query:query||"",
                lat:this.model.get('position').lat,
                lng:this.model.get('position').lng,
                radius:radius,
                activeCats:activeCats||[]
            });
        } else {
            args.push({
                lat:this.model.get('position').lat,
                lng:this.model.get('position').lng,
                radius:radius
            });
        }
        console.info(args);
        this.collection.loadByMethod(method,args);
    }
});
export default View;