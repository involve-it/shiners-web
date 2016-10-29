import Marionette from 'backbone.marionette';
import template from './ProfileDetailsView.hbs.html';
var View = Marionette.View.extend({
    template:template,
    initialize() {
        
    },

    events:{
        'load iframe':'removeHeader'
    },

    removeHeader(e) {
        console.info('remove header');
        window.myIframe = e.target;
    },

    onAttach() {
        this.$el.height(window.innerHeight-$('#header').height());
    }
});
export default View;