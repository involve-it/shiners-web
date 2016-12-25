﻿import Marionette from 'backbone.marionette';
import template from './DetailsView.hbs.html';
import app from '../app.js'
var View = Marionette.View.extend({
    template:template,
    tagName:'section',
    className:'sh-user-profile',
    initialize() {

    },

    onBeforeRender() {
        this.templateContext= {
            user:app.user.toJSON()
        }
    }
});
export default View;