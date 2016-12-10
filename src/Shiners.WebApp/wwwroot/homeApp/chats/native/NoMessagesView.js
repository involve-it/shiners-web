import Marionette from 'backbone.marionette';
import template from './NoMessagesView.hbs.html';

var View = Marionette.View.extend({
    template:template,
    tagName:'li'
    
});
export default View;