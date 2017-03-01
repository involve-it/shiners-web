import Marionette from 'backbone.marionette';
import ItemView from './BlogItemView.js';

var View = Marionette.CollectionView.extend({
    childView:ItemView,
    className:'blog-post-item-wrapper',
    tagName:'div'
});
export default View;