import Marionette from 'backbone.marionette';
import template from './PostsMyView.hbs.html';
var View = Marionette.View.extend({
    template:template,
    initialize() {
        
    },
/*
    tagName:'iframe',

    attributes: {
        width:'100%',
        src:'https://shiners.mobi/posts/my?isiframe=true'
    },
    */
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