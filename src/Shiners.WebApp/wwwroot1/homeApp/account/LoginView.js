import Marionette from 'backbone.marionette';
import template from './LoginView.hbs.html';
import app from '../app.js';
var View = Marionette.View.extend({
    template:template,
    initialize() {
        
    },

    modelEvents: {
        'login':'redirect',
        'error:login':'showError'
    },

    events:{
        'submit form':'onSubmit'
    },

    onSubmit(e) {
        e.preventDefault();
        var userName = this.$('#userLogin').val(),
            password = this.$('#userPassword').val();
        app.authorize(userName, password);
    },

    redirect() {
        app.router.navigate('/', true);
    },
    showError(error) {
        alert(error);
    }
});
export default View;