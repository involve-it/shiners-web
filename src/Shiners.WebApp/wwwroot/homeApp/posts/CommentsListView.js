import Marionette from 'backbone.marionette';
import ItemView from './CommentsItemView.js';



var View = Marionette.CollectionView.extend({

    childView: ItemView,
    className: 'sh-reviews-items',
    tagName: 'div'

});

export default View;