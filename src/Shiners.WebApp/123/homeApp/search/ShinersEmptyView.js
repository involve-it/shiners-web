import Marionette from 'backbone.marionette';
import template from './ShinersEmptyView.hbs.html';
var View = Marionette.View.extend({
    className:'sh-shiners-noitem',
    tagName:'div',
    template:template
});
export default View;