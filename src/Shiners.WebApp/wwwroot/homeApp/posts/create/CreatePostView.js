import Marionette from 'backbone.marionette';
import template from './CreatePostView.hbs.html';
import IframeView from '../../shared/iframeView.js';
import app from '../../app.js';

var View = Marionette.View.extend({
    template:template,
    initialize() {
    },

    events:{
        'load iframe':'removeHeader'
    },
    onRender() {
        var a = app, iView;
        if (app.views.iframeView) {
            iView = app.views.iframeView;
        } else {
            iView = new IframeView({
                 pagePath: 'posts/new'
            });
            iView.render();
            app.views.iframeView = iView;
        }
        //iView.updatePath('posts/new');
        $('#iframeHolder').show();
        //this.$('.js-iframe-holder').append(iView.$el);
    },
    removeHeader(e) {
        console.info('remove header');
        window.myIframe = e.target;
    },

    onAttach() {
        //this.$el.height(window.innerHeight-$('#header').height());
        $('body').addClass('sh-hidden-overflow');

    },
    onDestroy() {
        $('#iframeHolder').hide();
        $('body').removeClass('sh-hidden-overflow');

    }
});
export default View;