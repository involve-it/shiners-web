import Marionette from 'backbone.marionette';
import template from './UserDetailsPageView.hbs.html';
import IframeView from '../shared/iframeView.js';
import app from '../app.js';

var View = Marionette.View.extend({
    template:template,
    initialize(options = {}) {
        this.options = options;
    },
    onRender() {
        var a = app, iView;
        if (app.views.iframeView) {
            iView = app.views.iframeView;
        } else {
            iView = new IframeView({
                pagePath: `/user/${ this.options.id }`
            });
            iView.render();
            app.views.iframeView = iView;
        }
        iView.setPage(`/user/${ this.options.id }`);
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