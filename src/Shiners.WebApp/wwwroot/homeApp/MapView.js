import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import template from './MapView.hbs.html';
import createButtonTemplate from './CreateButton.hbs.html';
import setPositionMapButtonTemplate from './SetPositionMapButton.hbs.html';
import SearchView from './search/SearchView.js';
import ShinerInfoView from './ShinerInfoView.js';
import MapLoader from 'load-google-maps-api';
import _ from 'underscore';
import app from './app.js';
var View = Marionette.View.extend({
    tagName: 'section',
    className: 'map-section',
    template: template,
    map: null,
    model: null,
    shiners: [],
    mapInfoWindow: null,
    fetchTimeOut: null,
    geocodeTimeOut: null,
    geocoder: null,
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
            url: '../images/shiners/shiner_marker.png',
            size: new window.google.maps.Size(40, 52),
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
            this.geocoder = new maps.Geocoder();
            app.map = this.map;
            app.geocoder = this.geocoder;
            this.map.addListener('bounds_changed',_.bind(this.onBoundsChange,this));
            this.map.addListener('bounds_changed',_.bind(this.findLocationName,this));
            this.mapAddPostButton();
            this.mapSetPositionButton();
        },this));
    },

    mapAddPostButton() {
        var el = $(createButtonTemplate()).get(0);
        el.addEventListener('click', ()=> {
            app.router.navigate('Posts/new',{trigger:true});
        });
        this.map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(el);
    },

    mapSetPositionButton() {
        var el = $(setPositionMapButtonTemplate()).get(0),
            self=this;
        el.addEventListener('click', ()=> {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position)=> {
                    self.setMapPosition(position);
                }, ()=> {});
            }
        });
        this.map.controls[app.isMobile?window.google.maps.ControlPosition.TOP_RIGHT: window.google.maps.ControlPosition.TOP_CENTER].push(el);
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

    findLocationName() {
        if (this.geocodeTimeOut)
            clearTimeout(this.geocodeTimeOut);
        this.geocodeTimeOut = setTimeout(_.bind( ()=> {
            var center = this.map.getCenter();
            var latLng = {
                    lat:center.lat(),
                    lng:center.lng()
                };
            this.geocoder.geocode({'location': latLng},_.bind((results,status)=>{
                if (status === window.google.maps.GeocoderStatus.OK) {
                    var locationName = _.find(results[0].address_components,
                        (res) => {
                            return _.find(res.types,(type)=>type==='locality'||type==='administrative_area_level_2'||type==='political');
                        },this);
                    app.user.set({
                        position: latLng,
                        address:locationName.long_name
                    });
                } else {
                    console.error('Geocoder failed due to: ' + status);
                }
            },this));
            
        }, this), 500);
    },

    fetchPosts() {
        var query = this.model.get('query'),
            method='getNearbyPostsTest',
            activeCats=this.model.get('activeCats'),
            args,
            radius = this.model.get('radius')||7;
        if ((query && !_.isEmpty(query.trim()))||(activeCats&&!_.isEmpty(activeCats))) {
            method = 'searchPosts';
            args = {
                query:query||"",
                lat:this.model.get('position').lat,
                lng:this.model.get('position').lng,
                radius:radius,
                activeCats:activeCats||[]
            };
        } else {
            args={
                lat:this.model.get('position').lat,
                lng:this.model.get('position').lng,
                radius:radius
            };
        }
        console.info(args);
        this.collection.loadByMethod(method,args);
    }
});
export default View;