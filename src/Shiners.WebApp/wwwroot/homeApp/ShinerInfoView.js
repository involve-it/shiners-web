import Marionette from 'backbone.marionette';
import template from './ShinerInfoView.hbs.html';
import app from './app.js';
var View = Marionette.View.extend({
    listener:null,
    template:template,

    delegateMapEvent() {
        this.listener = window.google.maps.event.addDomListener(this.$('.toPostDetails')[0], 'click', _.bind(this.redirectToDetails,this));
    },

    redirectToDetails() {
        window.postInCollection = this.model.attributes;
        app.router.navigate('posts/'+this.model.id,{trigger:true});
    },

    onBeforeDestroy() {
        this.listener.remove();
    }
});
export default View;