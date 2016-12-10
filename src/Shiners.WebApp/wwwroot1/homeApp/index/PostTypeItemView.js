import Marionette from 'backbone.marionette';
import template from './PostTypeItemView.html';

var View = Marionette.View.extend({
    tagName:'li',
    template:template
});
export default View;