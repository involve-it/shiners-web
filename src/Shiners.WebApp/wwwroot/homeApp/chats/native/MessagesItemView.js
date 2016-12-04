import Marionette from 'backbone.marionette';
import template from './MessagesItemView.hbs.html';

var View = Marionette.View.extend({
    template:template,
    tagName:'li',
    className:'comment',
    onBeforeRender() {
        this.templateContext= {
            user:this.options.chat.get('user'),
            remoteUser:this.options.chat.get('remoteUser')
        }
    }
});
export default View;