import Marionette from 'backbone.marionette';
import template from './PostItemView.hbs.html';
import app from '../../app.js';
import locationHelper from '../../../helpers/locationHelper.js';
import postDuration from '../../../helpers/postDuration.js';


var View = Marionette.View.extend({
    template:template,
    className: 'sh-my-posts-item sh-page-block',

    onBeforeRender() {
        this.getDistance();
        this.getPostState();
    },    

    onRender() {},  

    getDistance() {
        var locations = this.model.get('details').locations;
        if (locations && _.size(locations) > 0 && app.user.has('position')) {
            var location = _.find(locations, function(l) { return l.placeType === 'dynamic'; });
            if (!location)
                location = locations[0];
            var dist = locationHelper.getDistance(location.coords.lat,location.coords.lng,app.user.get('position').lat,app.user.get('position').lng);
            this.model.set('distance',dist );
            this.model.set('distanceType', 'km');
            var obj = postDuration.getPostDuration(this.model);
            this.model.set('progress', obj.percent);
        } else {
            this.model.set('distance',-1);
            this.model.set('progress',0);
        }
    },

    getPostState() {
        var state = this.model.get('status').visible;       
        this.model.set('postState', (state === 'visible') ? 'on' : 'off');
    },

    events: {
        'click .js-delete-post': 'deletePost',

        '.js-edit-my-post click': ()=>{
            debugger;
        }
    },

    deletePost(e) {
        e.stopPropagation();
        e.preventDefault();

        var that = this,
            model =  this.model.toJSON(),
            postId = model._id;

        // load by menthod removePost        
        this.model.loadByMethod('deletePost', postId, function(){
            that.model.collection.remove(that.model);
        });        
    }
});
export default View;