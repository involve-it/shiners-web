import Marionette from 'backbone.marionette';
import template from './SuggestionsModalView.hbs.html';
import _ from 'underscore';
import app from '../../app.js';

export default Marionette.View.extend({

    template: template,

    initialize() {
        console.log("showSMV", this.model);
    }
    
});
