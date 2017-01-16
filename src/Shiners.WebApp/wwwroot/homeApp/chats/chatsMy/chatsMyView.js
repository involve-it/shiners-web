import Marionette from 'backbone.marionette';
import template from './chatsMyView.hbs.html';
import ItemView from './chatItemView'
var View = Marionette.CompositeView.extend({
    template: template,
    childView: ItemView,
    childViewContainer: '#myChatsContaner',
    onRender() {
    }
});
export default View;