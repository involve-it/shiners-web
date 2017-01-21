import Marionette from 'backbone.marionette'
import template from './MessagesToUserView.hbs.html'
import MessagesView from './MessagesListView.js'
import Model from '../../../data/AsteroidModel.js'
import app from '../../app.js'
var View = Marionette.View.extend({

    template:template,

    tagName:'section',

    regions: {
        'messages':'#messagesList'
    },

    onRender() {
        this.showChildView('messages',new MessagesView({collection:this.collection,model:this.model,childViewOptions:{ chat:this.model}}));
    },

    events:{
        'submit form':'sendMessage',
        'keypress #messageText': function(e) {
            if (e.charCode === 13 || e.keyCode === 13) {
                this.sendMessage(e);
            }
        }
    },

    sendMessage(e) {
        e.preventDefault();
        var $textEl = this.$('#messageText'); 
        var value = ($textEl.val()||"").trim();
        if (!_.isEmpty(value)) {
            var model = new Model({
                text: value,
                timestamp: new Date(),
                userId: this.model.get('user')._id,
                toUserId: this.model.get('remoteUser')._id,
                chatId: this.model.id
            },{asteroid:app.asteroid});
            //this.collection.add(model);
            model.save('addMessage',{destinationUserId:this.model.get('remoteUser')._id,message:value,type:'text',associatedPostId:this.model.get('postId')});
            $textEl.val('');
            $textEl.focus();
        }
    }

});
export default View;