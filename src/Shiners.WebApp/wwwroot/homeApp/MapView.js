import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import template from './MapView.hbs.html';
import createButtonTemplate from './CreateButton.hbs.html';
import setPositionMapButtonTemplate from './SetPositionMapButton.hbs.html';
import mobileShowInfoButtonTemplate from './MobileShowInfoButton.hbs.html';
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
    userMarker:null,
    fetchTimeOut: null,
    geocodeTimeout: null,
    geocoder: null,
    regions: {
        search:'#searchView',
        info:'#shinerInfoView'
    },

    events: {
        'click #closeInfo':'hideInfoContainer'
    },

    initialize() {
        
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
        if (app.isMobile) {
            app.router.navigate('posts/' + model.id, { trigger: true });
        } else {
            if (this.getRegion('info').hasView() && this.getChildView('info').model.id===model.id) {          
                this.hideInfoContainer();
            } else {
                this.showChildView('info', new ShinerInfoView({ model: model }));
                this.showInfoContainer();
            }
        }
        //if (this.infoView) {
        //    this.infoView.remove();
        //    this.infoView = null;
        //}
        //if (this.googleWindow) {
        //    this.googleWindow.close();
        //    this.googleWindow = null;
        //}
        //this.infoView = new ShinerInfoView({model:model});
        //var infoView = this.infoView;
        //this.googleWindow = new window.google.maps.InfoWindow({
        //    content: infoView.render().$el[0]
        //});
        //this.googleWindow.addListener('closeclick',() => infoView.remove());
        //window.google.maps.event.addListener(this.googleWindow,'domready',() => infoView.delegateMapEvent());
        //this.googleWindow.open(this.map, shiner);
        //this.once('before:destroy',this.infoView.remove,this.infoView);
    },

    hideInfoContainer() {
        this.getRegion('info').empty();
        this.$('#info-container').hide();
    },

    showInfoContainer() {
        this.$('#info-container').show();
    },

    initMap() {
        var defaultCoords = { lat: 55.75396, lng: 37.620393 };
        MapLoader({key:'AIzaSyCqCn84CgZN6o1Xc3P4dM657HIxkX3jzPY'}).then( _.bind((maps) => {
            var center = app.user.get('position') || defaultCoords;
            this.map = new maps.Map(document.getElementById('map2'),
            {
                center: center,
                zoom: 14,
                scrollwheel: false
            });
            this.geocoder = new maps.Geocoder();
            app.map = this.map;
            window.myMap = app.map;
            app.geocoder = this.geocoder;
            this.map.addListener('bounds_changed',_.bind(this.onBoundsChange,this));
            this.map.addListener('bounds_changed',_.bind(this.findLocationName,this));
            if (app.isMobile) {
                this.mobile_CreateInfoButton();
                this.mobile_mapResize();
                this.mobile_listenToResize();
            }
            this.mapAddPostButton();
            this.mapSetPositionButton();
            
            this.showUser();
            this.listenTo(app.user,'change:position',this.showUser);
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
                    app.user.set('position', {type:'navigator',lat:position.coords.latitude,lng:position.coords.longitude});
                    self.setMapPosition(position);
                }, ()=> {});
            }
        });
        this.map.controls[app.isMobile?window.google.maps.ControlPosition.BOTTOM_CENTER: window.google.maps.ControlPosition.TOP_CENTER].push(el);
    },

    mobile_CreateInfoButton() {
        var el = $(mobileShowInfoButtonTemplate()).get(0);
        el.addEventListener('click', ()=> {
            app.router.navigate('mobileIndex',{trigger:true});
        });
        this.map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(el);
    },

    mobile_mapResize() {
        this.$('#map2').height($(window).height()-$('#header').height());
        window.google.maps.event.trigger(app.map, 'resize');
    },

    mobile_listenToResize() {
        $(window).resize(_.bind(this.mobile_mapResize,this));
    },

    showUser() {
        if (app.user.has('position')) {
            var image = {
                url: '../images/shiners/user.png',
                size: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(20, 20)
            };
            var marker =  this.userMarker || new window.google.maps.Marker({
                map: this.map,
                icon: image,
                title: 'Вы (' + (app.user.get('username') ||'анонимный пользователь') +')'
            });
            marker.setPosition(app.user.get('position'));
            if (!this.userMarker)
                this.userMarker = marker;
        }
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
            var center = this.map.getCenter();
            this.model.set({
                position: {
                    lat:center.lat(),
                    lng:center.lng()
                }
            });
        }, this), 500);
    },

    findLocationName() {
        if (this.geocodeTimeout)
            clearTimeout(this.geocodeTimeout);
        this.geocodeTimeout = setTimeout(_.bind( ()=> {
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
                    this.model.set({
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
            radius = this.model.get('radius')||5;
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
        this.collection.loadByMethod(method,args);
    }
});
export default View;