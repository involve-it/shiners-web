import Marionette from 'backbone.marionette';
import template from './ChatIdView.hbs.html';
var View = Marionette.View.extend({
    template:template,
    initialize() {
        
    },
  /*  tagName:'iframe',

    attributes: {
        width:'100%',
        src:'https://shiners.mobi/chat/'+chatId._id+'?isiframe=true'
    },
    */
    events:{
        'load iframe':'removeHeader'
    },

    removeHeader(e) {
        console.info('remove header');
        window.myIframe = e.target;
        console.info(src)
    },

    onAttach() {
        this.$el.height(window.innerHeight-$('#header').height());
    }
});
export default View;