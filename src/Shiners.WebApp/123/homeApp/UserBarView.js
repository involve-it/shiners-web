import Marionette from 'backbone.marionette';
import template from './UserBarView.hbs.html';
import app from './app.js';
var View = Marionette.View.extend({
    template:template,
    tagName:'ul',
    className:'pull-right nav nav-pills nav-second-main',
    events: {
        'click #logout':'logout',
        'click #userBarLink':'toggleView'
    },
    logout() {
        app.logout();
    },

    toggleView() {
        if (this.$('.quick-cart-box').is(':visible')) {
            this.$('.quick-cart-box').fadeOut(300);
        } else {
            this.$('.quick-cart-box').fadeIn(300);
        }
    },

    modelEvents: {
        'logout':'render',
        'login':'render'
    }
});
export default View;