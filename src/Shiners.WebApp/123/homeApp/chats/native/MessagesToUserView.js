import Marionette from 'backbone.marionette';
import template from './MessagesToUserView.hbs.html';

var View = Marionette.View.extend({
    template:template,
    tagName:'section',
    initialize() {
        
    },

    events:{
        
    }
});
export default View;