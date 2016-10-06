import Marionette from 'backbone.marionette';
import template from './CreatePostView.hbs.html';
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
    }
});
export default View;