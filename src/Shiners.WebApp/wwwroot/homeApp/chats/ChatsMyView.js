import Marionette from 'backbone.marionette';
import template from './ChatsMyView.hbs.html';
var View = Marionette.View.extend({
    template:template,
    initialize() {
        
    },
/*
    tagName:'iframe',

    attributes: {
        width:'100%',
        src:'https://shiners.mobi/chats/my?isiframe=true'
    },
    */
    //events:{
    //    'load iframe':'removeHeader'
    //},

    //removeHeader(e) {
    //    console.info('remove header');
    //    window.myIframe = e.target;
    //},
    onRender() {

    },

    onAttach() {
        $('body').addClass('sh-hidden-overflow');

    },
    onDestroy() {
        $('#iframeHolder').hide();
        $('body').removeClass('sh-hidden-overflow');
    }
});
export default View;