import Marionette from 'backbone.marionette';
import template from './ShinersListItemView.hbs.html';
var View = Marionette.View.extend({
    className:'clearfix margin-bottom-10',
    tagName:'div',
    template:template,

    initialize() {
        
    }
});
export default View;