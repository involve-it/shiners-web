import Marionette from 'backbone.marionette';
import template from './ShinerInfoView.hbs.html';
import app from './app.js';
import locationHelper from '../helpers/locationHelper.js';
var View = Marionette.View.extend({

    template:template,

    initialize() {
        window.postInCollection = this.model.attributes;
    },

    events: {
        'click a':'redirectToDetails'
    },

    onBeforeRender() {
        this.getDistance();
    },

    getDistance() {
        var locations = this.model.get('details').locations;
        if (locations && _.size(locations) > 0 && app.user.has('position')) {
            var location = _.find(locations, function(l) { return l.placeType === 'dynamic'; });
            if (!location)
                location = locations[0];
            var dist = locationHelper.getDistance(location.coords.lat,location.coords.lng,app.user.get('position').lat,app.user.get('position').lng);
            this.model.set('distance',dist );
            this.model.set('distanceType', 'km');
            var bounds = app.map.getBounds().toJSON();
            var len = locationHelper.getDistance(bounds.north, bounds.east, bounds.south, bounds.west)/2;
            this.model.set('progress',dist>300?1:((len-dist)/len)*100.0);
            //var currentDate = (new Date()).valueOf();
            //var progres = this.model.has('endDatePost')? (this.model.get('endDatePost')/currentDate) *100:100;
        } else {
            this.model.set('distance',-1);
            this.model.set('progress',0);
        }
    },

    redirectToDetails() {
        app.router.navigate('posts/'+this.model.id,{trigger:true});
    }

});
export default View;