﻿import Marionette from 'backbone.marionette';
import template from './SuccessView.html';
import Backbone from 'backbone'
var View = Marionette.View.extend({  
    template:template,
    initialize(options) {
        var opts = options || {};
        this.model = new Backbone.Model({
            resultUrl:opts.resultUrl,
            message:opts.message
        });
    }
});
export default View;