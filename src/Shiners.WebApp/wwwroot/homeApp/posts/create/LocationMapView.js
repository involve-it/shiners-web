import Marionette from 'backbone.marionette';
import template from './LocationMapView.hbs.html'
import app from '../../app.js'
export default Marionette.View.extend({
    template:template,
    map:null,
    shiner:null,
    onAttach() {
        this.initMap();
        this.showShiner();
        //selectLocation_map
    },

    initMap() {
        var defaultCoords = { lat: 55.75396, lng: 37.620393 };
        var center = app.user.get('position') || defaultCoords;
        this.map = new google.maps.Map(this.$('#selectLocation_map')[0],
        {
            center: center,
            zoom: 14,
            scrollwheel: false
        });
    },

    showShiner() {
        var image = {
            url: '/images/shiners/shiner_marker.png',
            scaledSize: new window.google.maps.Size(25, 33),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(0, 32)
        };
        this.shiner = new window.google.maps.Marker({
            position: this.model.get('position'),
            map: this.map,
            icon: image,
            title: 'перетащите светлячок'
        });       
    },

    onBeforeRemove() {
        this.map.unbindAll();
        delete this.map;
    }
});