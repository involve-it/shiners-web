import Marionette from 'backbone.marionette';
import ItemView from './PostTypeItemView.js';
var View = Marionette.CollectionView.extend({
    childView:ItemView,
    className:'list-unstyled',
    tagName:'ul'
});
export default View;