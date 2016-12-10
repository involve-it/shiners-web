import Marionette from 'backbone.marionette';
import template from './CreatePostView.hbs.html';
import app from '../../app.js';

var View = Marionette.View.extend({
    template:template,
    tagName:'section',
    events: {
        'click #back':'back'
    },

    onBeforeRender() {
        this.templateContext= {
            postTypes:app.postAdTypes.toJSON()
        }
    },

    save() {
        
    },


    back() {
        history.back();
    }
    
});
export default View;