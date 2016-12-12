import Marionette from 'backbone.marionette';
import ItemView from './ImageView.js'

export default Marionette.CollectionView.extend({
    childView:ItemView,
    tagName:'div',
    className:'sh-photos-upload-thumbs'
});