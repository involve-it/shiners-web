import Marionette from 'backbone.marionette';
import ItemView from './PostTypeItemView.js';
var View = Marionette.CollectionView.extend({
    childView:ItemView,
    className:'sh-post-type',
    tagName:'dl'
});
export default View;