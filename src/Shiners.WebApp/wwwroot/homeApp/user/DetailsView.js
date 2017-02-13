import Marionette from 'backbone.marionette';
import template from './DetailsView.hbs.html';
import _ from 'underscore';
import app from '../app.js';

var View = Marionette.View.extend({
    template:template,
    tagName:'section',
    className:'sh-user-profile',

    initialize() {},

    onBeforeRender() {        
        this.templateContext = {
            user: app.user.toJSON()
        }
    },

    onRender() {
        window.user = this.templateContext; //debug
    }
});

export default View;