import Marionette from 'backbone.marionette';
import template from './SendMessageView.hbs.html';
import Model from '../../data/AsteroidModel.js';
import  './SendMessageView.less';
import app from '../app.js';


export default Marionette.View.extend({
    template: template,

    events: {
        'submit form':'sendMessage'
    },

    sendMessage(e) {
        e.preventDefault();
        var self = this;
        var $textEl = this.$('#message-to-user'),
            value = ($textEl.val() || "").trim();

        if (!_.isEmpty(value)) {
            var model = new Model({
                text: value,
                timestamp: new Date(),
                userId: this.model.get('user_id'),
                toUserId: this.model.get('remoteUser_id'),
                chatId: this.model.get('chatId')
            }, {asteroid:app.asteroid});
            
           // model.save('addMessage',{destinationUserId:this.model.get('remoteUser')._id,message:value,type:'text',associatedPostId:this.model.get('postId')});
           //$textEl.val('');
           //$textEl.focus();

            console.log('Model ', model.toJSON())
            
            self.remove();
            self.trigger('destroy');
        }
       
    }
});