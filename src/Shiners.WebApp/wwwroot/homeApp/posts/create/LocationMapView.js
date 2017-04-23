import Marionette from 'backbone.marionette';
import template from './LocationMapView.hbs.html'
import app from '../../app.js'
import locationBindToUserPositionTemplate from './LocationBindToUserPosition.hbs.html';
import locationSetButtonTemplate from './LocationSetButton.hbs.html';
export default Marionette.View.extend({
    template: template,
    map: null,
    shiner: null,
    userMarker:null,
    infoWindow:null,
    geocodeTimeout:null,
    searchInput:null,

    modelEvents: {
        'change:name':'renderName',
        'change:placeType':'bindOrUnbindToUser'
    },

    onAttach() {
        this.initMap();
        this.showShiner();
        this.showUser();
        this.showDoneButton();
        this.showDynamicOrStaticSelection();
        this.showSearchBox();
    },

    renderName() {
        this.$('#locationMap_locationName').val(this.model.get('accurateAddress'));
    },

    initMap() {
        var defaultCoords = { lat: 55.75396, lng: 37.620393 };
        var center = app.user.get('position') || defaultCoords;
        this.map = new google.maps.Map(this.$('#selectLocation_map')[0],
        {
            center: center,
            zoom: 14
        });
    },

    showShiner() {
        var image = {
            url: '/images/shiners/shiner_marker.png',
            scaledSize: new window.google.maps.Size(25, 33),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(12, 33)
        };
        this.shiner = new window.google.maps.Marker({
            position: this.map.getCenter(),
            map: this.map,
            icon: image,
            title: 'перетащите светлячок',
            draggable: true
        });
        window.shiner = this.shiner; // debug
        this.infoWindow = new google.maps.InfoWindow({
            content: "Перетащите светлячок"
        });
        this.shiner.addListener('position_changed',_.bind(this.setLocation,this));
        this.infoWindow.open(this.map, this.shiner);
        this.setLocation();
    },

    showUser() {
        var image = {
            url: '/images/shiners/user.png',
            scaledSize: new window.google.maps.Size(35, 35),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 17)
        };
        this.userMarker = new window.google.maps.Marker({
            position: app.user.get('position'),
            map: this.map,
            icon: image,
            title: 'Вы (' + app.user.get('username') +')'
        });
    },

    showDoneButton() {
        var el = $(locationSetButtonTemplate()).get(0);
        var self = this;
        el.addEventListener('click', ()=> {
            //self.setLocation();
            self.remove();
            self.trigger('destroy');
        });
        this.map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(el);
    },

    showDynamicOrStaticSelection() {
        var $container = $(locationBindToUserPositionTemplate()),
            self=this;
        this.changePlaceTypeEl = $container.find('input')[0];
            
        this.changePlaceTypeEl.addEventListener('change', ()=> {
            if (self.changePlaceTypeEl.checked) {
                self.model.set('placeType', 'dynamic');
                self.shiner.setDraggable(false);
            } else {
                self.model.set('placeType','static');
                
            }
        });
        this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push($container[0]);           
        $container.tooltip();
    },

    bindOrUnbindToUser() {
        if (this.model.get('placeType')==='dynamic') {
            this.infoWindow.close();
            this.shiner.setPosition(app.user.get('position'));
            this.shiner.setDraggable(false);   
            this.$(this.searchInput).prop('readonly', true);
            
            var bounds = new google.maps.LatLngBounds();
            this.map.setCenter(this.shiner.getPosition());

        } else {
            this.shiner.setDraggable(true);
            this.infoWindow.open(this.map,this.shiner);
            this.$(this.searchInput).prop('readonly', false);
        }
            
    },

    setLocation() {
        var model = this.model,
            self=this;
        if (this.geocodeTimeout)
            clearTimeout(this.geocodeTimeout);
        this.geocodeTimeout = setTimeout(() => {
            
            app.geocoder.geocode({'location': self.shiner.getPosition()},(results,status)=> {
                if (status === window.google.maps.GeocoderStatus.OK) {
                    var parts = results[0].formatted_address.split(', ');
                    parts.length =parts.length> 3?3:parts.length;
                    model.set({
                        coords: self.shiner.getPosition(),
                        name:results[0].formatted_address,
                        accurateAddress:parts.join(', '),
                        placeType: self.shiner.getDraggable()?'static':'dynamic'
                    });
                }
            });

        },300);      
    },

    onBeforeRemove() {
        this.map.unbindAll();
        delete this.map;
    },

    showSearchBox() {
        this.searchInput = document.getElementById('locationMap_locationName'); 
        var searchBox = new google.maps.places.SearchBox(this.searchInput);
        //this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(input);
        var model = this.model,
              self=this;
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            var place = places[0];
            self.shiner.setPosition(place.geometry.location);
            self.map.setCenter(self.shiner.getPosition());
        });
    }
});