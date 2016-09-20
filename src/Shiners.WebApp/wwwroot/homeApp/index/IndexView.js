import Marionette from 'backbone.marionette';
import Template from './IndexView.hbs.html';

export default Marionette.View.extend({

    template:Template,

    events: {
        'click div.toggle > label':"toggleSlide"
    },

    toggleSlide(e){
        var previewParClosedHeight = 25;

        var parentSection 	= $(e.target).parent(),
            parentWrapper 	= $(e.target).parents("div.toggle"),
            previewPar 		= false,
            isAccordion 	= parentWrapper.hasClass("toggle-accordion");

        if(isAccordion && typeof(e.originalEvent) != "undefined") {
            parentWrapper.find("div.toggle.active > label").trigger("click");
        }

        parentSection.toggleClass("active");

        if(parentSection.find("> p").get(0)) {

            previewPar 					= parentSection.find("> p");
            var previewParCurrentHeight = previewPar.css("height");
            var previewParAnimateHeight = previewPar.css("height");
            previewPar.css("height", "auto");
            previewPar.css("height", previewParCurrentHeight);

        }
            
        var toggleContent = parentSection.find("> div.toggle-content");

        if(parentSection.hasClass("active")) {

            $(previewPar).animate({height: previewParAnimateHeight}, 350, function() {$(e.target).addClass("preview-active");});
            toggleContent.slideDown(350);

        } else {

            $(previewPar).animate({height: previewParClosedHeight}, 350, function() {$(e.target).removeClass("preview-active");});
            toggleContent.slideUp(350);

        }
    }
});