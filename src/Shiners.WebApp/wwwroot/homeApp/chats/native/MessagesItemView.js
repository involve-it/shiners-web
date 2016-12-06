import Marionette from 'backbone.marionette';
import template from './MessagesItemView.hbs.html';

var View = Marionette.View.extend({
    template:template,
    tagName:'li',
    className:'comment',
    onBeforeRender(options) {
        this.templateContext = {
            user: this.options.chat.get('user'),
            remoteUser: this.options.chat.get('remoteUser'),
            status:options&&options.status?options.status: (this.model.id ? 'check':'time')
        }
    },

    events: {
        'click .removeMessage':'removeMessage'
    },

    modelEvents: {
        'save':'onSuccessSave',
        'error:save':'onErrorSave',
        'before:save':'onBeforeSave'
    },

    onSuccessSave() {
        this.render({status:'check'});
    },

    onErrorSave() {
        this.render({status:'remove'});
    },

    onBeforeSave() {
        this.render({status:'time'});
    },

    removeMessage() {
        this.model.remove('removeMessages',[this.model.id]);
    }
});
export default View;