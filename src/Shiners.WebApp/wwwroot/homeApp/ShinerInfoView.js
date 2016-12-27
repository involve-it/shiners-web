import Marionette from 'backbone.marionette';
import template from './ShinerInfoView.hbs.html';
import app from './app.js';
import locationHelper from '../helpers/locationHelper.js';
var View = Marionette.View.extend({

    template:template,

    initialize() {
        window.postInCollection = this.model.attributes; // debug
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
            var currentDate = (new Date()).valueOf(),
                endDate=this.model.get('endDatePost'),
                createDate = this.model.get('timestamp');
            var progress = endDate? ((currentDate-createDate)/(endDate-createDate)) *100:100;
            this.model.set('progress', progress);
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