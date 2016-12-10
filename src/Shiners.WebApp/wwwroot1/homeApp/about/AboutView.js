import Marionette from 'backbone.marionette';
import template from './AboutView.hbs.html';
import app from '../app.js';
var View = Marionette.View.extend({
    template:template,

    events: {
        'submit form':'sendMessage'

    },
    sendMessage(e) {
        e.preventDefault();
        var text = this.$('#message_text').val(),
            name=this.$('#user_name').val(),
            email = this.$('#user_email').val();

        var msg = "user: " + name + "\n" + "email: " + email + "\n" + text;
        var self = this;
        app.asteroid.call('sendMessageContactUs', msg).result.then(() => {
            alert('Сообщение отправлено');
            self.render();
        }) ;
    }
});
export default View;