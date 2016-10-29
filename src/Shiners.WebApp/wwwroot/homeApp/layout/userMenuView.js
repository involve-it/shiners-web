
import Backbone from 'backbone';
import template from './userMenuView.hbs.html';
import app from '../app.js';
var View = Backbone.Marionette.View.extend({
    template:template,
    tagName: 'li',
    events: {
        
    }

});
export default View;