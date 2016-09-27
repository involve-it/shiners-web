import Marionette from 'backbone.marionette';
import template from './SearchView.hbs.html';

import '../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.min.css';
import '../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.js';
import '../lib/jquery-slimscroll/jquery.slimscroll.min.js';
//import '../lib/form.slidebar/jquery-ui-slider-pips.min.js';
var View = Marionette.View.extend({
    
    template:template,

    className:'contact-over-box',
    events: {
        'click #searchParametersButton':'toggleSearchParameters'
    },

    onAttach() {
        this.initSlimscroll();
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
    },

    initSlimscroll() {
        var height;
        var $el = this.$('.slimscroll');
        if ($el.attr("data-height")) {
            height = $el.attr("data-height");
        } else {
            height = $el.height();
        }

        $el.slimScroll({
            size: 				$el.attr("data-size") 							|| '5px',
            opacity: 			$el.attr("data-opacity") 						|| 0.6,
            position: 			$el.attr("data-position") 						|| 'right',
            allowPageScroll:	false, // not working
            disableFadeOut: 	false,
            railOpacity: 		$el.attr("data-railOpacity") 					|| 0.05,
            alwaysVisible: 		($el.attr("data-alwaysVisible") != "false" 	? true : false),
            railVisible: 		($el.attr("data-railVisible")   != "false" 	? true : false),
            color: 				$el.attr("data-color")  						|| '#333',
            wrapperClass: 		$el.attr("data-wrapper-class") 				|| 'slimScrollDiv',
            railColor: 			$el.attr("data-railColor")  					|| '#eaeaea',
            height: 			height
        });				
        // Disable body scroll on slimscroll hover
        if($el.attr('disable-body-scroll') == 'true') {
            $el.bind('mousewheel DOMMouseScroll', function(e) {
                var scrollTo = null;
                if (e.type == 'mousewheel') {
                    scrollTo = (e.originalEvent.wheelDelta * -1);
                }
                else if (e.type == 'DOMMouseScroll') {
                    scrollTo = 40 * e.originalEvent.detail;
                }
                if (scrollTo) {
                    e.preventDefault();
                    $el.scrollTop(scrollTo + $el.scrollTop());
                }
            });
        }
    }
});
export default View;