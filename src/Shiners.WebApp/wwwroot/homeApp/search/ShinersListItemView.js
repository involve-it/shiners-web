import Marionette from 'backbone.marionette';
import template from './ShinersListItemView.hbs.html';
var View = Marionette.View.extend({
    className:'sh-shiners-list-item clearfix',
    tagName:'div',
    template:template,

    initialize() {
        
    }
});
export default View;