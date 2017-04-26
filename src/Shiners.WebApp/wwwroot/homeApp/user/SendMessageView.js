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
            value = ($textEl.val() || "").trim(),
            remoteUserId = this.model.get('remoteUser_id');

        if (!_.isEmpty(value)) {                        
            if (app.asteroid.loggedIn) {
                //var remoteUser = new Model({_id: remoteUserId}, {asteroid: app.asteroid});
                app.asteroid.call('bz.chats.createChatIfFirstMessage', app.user.id, remoteUserId).then((chatId) => {
                    
                    var model = new Model({
                        text: value,
                        timestamp: new Date(),
                        userId: this.model.get('user_id'),
                        toUserId: remoteUserId,
                        chatId: chatId
                    }, {asteroid:app.asteroid});

                    model.save('addMessage', {
                        destinationUserId: remoteUserId,
                        message: value,
                        type: 'text'
                    });

                    $textEl.val('');
                    $textEl.focus();

                    self.remove();
                    self.trigger('destroy');

                    setTimeout(function() {
                        app.router.navigate(`/chats/${ chatId }?remoteUserId=${ remoteUserId }`, { trigger: true, replace: true });
                    }, 1000);
                });
            } else {
                app.router.navigate('', {trigger: true});
            }
        }       
    }
});