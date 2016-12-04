import Marionette from 'backbone.marionette'
import template from './MessagesToUserView.hbs.html'
import MessagesView from './MessagesListView.js'
import Model from '../../../data/AsteroidModel.js'
var View = Marionette.View.extend({

    template:template,

    tagName:'section',

    regions: {
        'messages':'#messagesList'
    },

    onRender() {
        this.showChildView('messages',new MessagesView({collection:this.collection,childViewOptions:{ chat:this.model  }}));
    },

    events:{
        'form submit':'sendMessage'
    },

    sendMessage(e) {
        e.preventDefault();
        var value = (this.$('#messageText').val()||"").trim();
        if (!_.isEmpty(value)) {
            var model = new Model({
                text: value,
                timestamp: new Date(),
                userId: this.model.get('user')._id,
                toUserId: this.model.get('remoteUser')._id,
                chatId: this.model.id
            });
            this.collection.add(model);
        }
    }

});
export default View;