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
        if(this.options.returnUrl)
            app.router.navigate(decodeURIComponent(this.options.returnUrl),  {trigger:true,replace:true});
        else
            history.back();
    },
    showError(error) {
        alert(error);
    }
});
export default View;