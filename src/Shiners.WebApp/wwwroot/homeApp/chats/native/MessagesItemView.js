import Marionette from 'backbone.marionette';
import template from './MessagesItemView.hbs.html';
import './messageItemView.less';

var View = Marionette.View.extend({
    template:template,
    tagName:'li',
    className: function() {
      return `sh-message ${ this.model.get('userId') === this.options.chat.get('user')._id? 'sh-message-my': 'sh-message-remote' }`;
    },
    status:null,
    onBeforeRender() {
        this.templateContext = {
            user: this.options.chat.get('user'),
            remoteUser: this.options.chat.get('remoteUser'),
            status:this.status?this.status : (this.model.id ? (this.model.id===this.options.chat.get('user').id?'old':'remote'):'sending')
        }
    },

    onRender() {
        this.status = null;
    },

    events: {
        'click .removeMessage':'removeMessage',
        'click .editMessage':'debugCHeck'
    },

    modelEvents: {
        'save':'onSuccessSave',
        'error:save':'onErrorSave',
        'before:save':'onBeforeSave'
    },

    onSuccessSave() {
        this.status = 'success';
        this.render();
    },

    onErrorSave() {
        this.status = 'error';
        this.render();
    },

    onBeforeSave() {
        this.status = 'sending';
        this.render();
    },

    removeMessage() {
        this.model.remove('deleteMessages',[[this.model.id]]);
        this.model.collection.remove(this.model);
    }
});
export default View;