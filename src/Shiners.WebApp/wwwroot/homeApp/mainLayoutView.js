import Marionette from 'backbone.marionette';
import template from './MainLayoutView.hbs.html';
import _ from 'underscore';
import '../lib/jquery.appear.js';
import '../lib/jquery.countTo.js';

var View = Marionette.View.extend({
    template:template,
    id:"wrapper",
    regions: {
        'content':'#homeContent'
    }
});
export default View;