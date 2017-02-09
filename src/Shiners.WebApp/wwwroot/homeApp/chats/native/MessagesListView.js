import Marionette from 'backbone.marionette'
import ItemView from './messagesItemView.js'
import EmptyView from './NoMessagesView.js'
import app from '../../app.js'
var View = Marionette.CollectionView.extend({
    childView:ItemView,
    emptyView:EmptyView,
    tagName:'ul',
    className:'sh-messages-container list-unstyled',

    initialize() {
        this.listenTo(app, 'add:message',fields=> this.collection.add(fields));
    },

    onRender() {
       // this.collection.sub('messages-new');
    },

    onBeforeDestroy() {
        //this.collection.unsub();
    }

});
export default View;