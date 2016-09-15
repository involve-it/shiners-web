import Marionette from 'backbone.marionette';
import template from './SearchView.hbs.html';
var View = Marionette.View.extend({
    
    template:template,

    className:'contact-over-box',

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
    }

});
export default View;