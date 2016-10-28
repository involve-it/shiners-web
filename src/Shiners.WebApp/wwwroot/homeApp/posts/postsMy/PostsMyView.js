import Marionette from 'backbone.marionette';
import template from './PostsMyView.hbs.html';
import IframeView from '../../shared/iframeView.js';
import app from '../../app.js';

var View = Marionette.View.extend({
    template:template,
 /*   initialize() {
    },

    tagName:'iframe',

    attributes: {
        width:'100%',
        src:'https://shiners.mobi/posts/my?isiframe=true'
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
        var a = app, iView;
        if (app.views.iframeView) {
            iView = app.views.iframeView;
        } else {
            iView = new IframeView({
                pagePath: '/posts/my'
            });
            iView.render();
            app.views.iframeView = iView;
        }
        iView.setPage('/posts/my');
        $('#iframeHolder').show();
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