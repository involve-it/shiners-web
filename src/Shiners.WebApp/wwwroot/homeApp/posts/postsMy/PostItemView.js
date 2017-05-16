import Marionette from 'backbone.marionette';
import template from './PostItemView.hbs.html';
import ConfirmView from '../../../sharedViews/ConfirmView.js';
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

    initialize() {
        this.confirmAnswer = new Backbone.Model({questions: null});
        this.listenTo(this.confirmAnswer,'change', this.deletePost);
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
        'click .js-delete-post': 'clickDeleteBtn',
        '.js-edit-my-post click': ()=>{
            debugger;
        }
    },

    clickDeleteBtn(e) {
        e.stopPropagation();
        e.preventDefault();

        var that = this,
            model =  this.model.toJSON(),
            message = model.details.title || '';

        //show modal window
        var title = i18n.getLanguage() === 'ru'? 'Удаление поста': 'Delete post';
        app.layout.showChildView('modal', new ConfirmView({answer: this.confirmAnswer, title: title, message: message}));
    },

    deletePost(e) {        
        var questions = this.confirmAnswer.get('questions');

        var that = this,
            model =  this.model.toJSON(),
            postId = model._id;

        setTimeout(function() {
            if(questions) {                        
                that.model.loadByMethod('deletePost', postId, function(){
                    that.model.collection.remove(that.model);
                });
            }
        }, 1500); 
        
        this.confirmAnswer.set('questions', null);                
    }
});
export default View;