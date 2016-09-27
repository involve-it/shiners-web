import Marionette from 'backbone.marionette';
import template from './SearchView.hbs.html';

import '../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.min.css';
import '../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.js';
//import '../lib/form.slidebar/jquery-ui-slider-pips.min.js';
var View = Marionette.View.extend({
    
    template:template,

    className:'contact-over-box',
    events: {
        'click #searchParametersButton':'toggleSearchParameters'
    },
    onRender() {
        var self=this;
        self.$("#slider3").slider({
                        range: "min",
                        animate: true,
                        min: 1,
                        max: 50,
                        step: 10,
                        value: 10,
                        slide: function(event, ui) {
                            self.$("#bedrooms").val(ui.value);
                        }
                    });

        self.$("#bedrooms").val(self.$("#slider3").slider("value"));
        self.$("#slider3").slider("pips", { rest: "label" });
    },

    toggleSearchParameters() {
        this.$('#searchParameters').slideToggle(300);
    }

});
export default View;