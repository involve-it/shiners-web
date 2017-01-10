import Marionette from 'backbone.marionette';
import template from './ShinersListItemView.hbs.html';
import app from '../app'
import locationHelper from '../../helpers/locationHelper.js'
var View = Marionette.View.extend({
    className:'sh-shiners-list-item clearfix',
    tagName:'div',
    template:template,

    initialize() {
        
    },

    onBeforeRender() {
        this.setModelDistance();
    },

    setModelDistance() {
        var locations = this.model.get('details').locations;
        if (locations && _.size(locations) > 0 && app.user.has('position')) {
            var location = _.find(locations, function(l) { return l.placeType === 'dynamic'; });
            if (!location)
                location = locations[0];
            var dist = locationHelper.getDistance(location.coords.lat,
                location.coords.lng,
                app.user.get('position').lat,
                app.user.get('position').lng);
            this.model.set('distance',dist );
            this.model.set('distanceType', 'km');
        } else {
            this.model.set('distance',-1);
        }       
    }
});
export default View;