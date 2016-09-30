import Marionette from 'backbone.marionette';
import template from './CategoriesItemView.html';
var View = Marionette.CompositeView.extend({
    template:template,
    tagName:'li',
    className:'list-group-item'
});
export default View;