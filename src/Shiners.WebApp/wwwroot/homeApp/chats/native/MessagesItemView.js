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
            status:options?options.status: (this.model.id ? 'sent':'sending')
        }
    },

    modelEvents: {
        'save':'onSuccessSave',
        'error:save':'onErrorSave',
        'before:save':'onBeforeSave'
    },

    onSuccessSave() {
        this.render({status:'sent'});
    },

    onErrorSave() {
        this.render({status:'error'});
    },

    onBeforeSave() {
        this.render({status:'sending'});
    }
});
export default View;