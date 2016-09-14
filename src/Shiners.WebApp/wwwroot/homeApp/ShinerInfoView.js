import Marionette from 'backbone.marionette';
import template from './ShinerInfoView.hbs.html';
var View = Marionette.View.extend({
    
    template:template,

    onBeforeRender() {
        var Handlebars = require("../../node_modules/handlebars/runtime.js");
        var MomentHandler = require("handlebars.moment");
        MomentHandler.registerHelpers(Handlebars);
    }
});
export default View;