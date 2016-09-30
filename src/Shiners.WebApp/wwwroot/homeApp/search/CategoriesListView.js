import Marionette from 'backbone.marionette';
import template from './CategoriesListView.html';
import ItemView from './CategoriesItemView.js';

var View = Marionette.CompositeView.extend({
    className:'side-nav',
    template:template,
    childView:ItemView
});
export default View;