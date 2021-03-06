﻿import Marionette from 'backbone.marionette';
import template from './ProfilePageView.hbs.html';
import IframeView from '../shared/iframeView.js';
import app from '../app.js';

var View = Marionette.View.extend({
    template:template,
    onRender() {
        var a = app, iView;
        if (app.views.iframeView) {
            iView = app.views.iframeView;
        } else {
            iView = new IframeView({
                pagePath: '/profile'
            });
            iView.render();
            app.views.iframeView = iView;
        }
        iView.setPage('/profile');
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