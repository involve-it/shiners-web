import Marionette from 'backbone.marionette';
import template from './NavLocationView.hbs.html';
import app from './app.js';
var View = Marionette.View.extend({
    template:template,
    tagName:'a',
    className: 'sh-nav-h white-link',

    modelEvents: {
        'change:address':'render'
    },

    events: {
        'click':'showChangeLocation'
    },

    showChangeLocation() {
        app.layout.showChangeLocation();
    }
});
export default View;