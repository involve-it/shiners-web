import Marionette from 'backbone.marionette'
import ItemView from './MessagesItemView.js'
import EmptyView from './NoMessagesView.js'
var View = Marionette.CollectionView.extend({
    childView:ItemView,
    emptyView:EmptyView,
    tagName:'ul',
    className:'comment list-unstyled'
});
export default View;