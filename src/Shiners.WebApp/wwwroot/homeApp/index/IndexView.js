﻿import Marionette from 'backbone.marionette';
import Template from './IndexView.hbs.html';
import '../../lib/jquery-parallax/scripts/jquery.parallax-1.1.3.js';
import PostTypesView from './PostTypesView.js';
import app from '../app.js';
import './i18n/ru';
import './i18n/en';
export default Marionette.View.extend({

    template:Template,

    events: {
        'click div.toggle > label':"toggleSlide"
    },

    regions: {
        'postTypes':'#postAdTypes'
    },

    onRender() {
        this.showChildView('postTypes', new PostTypesView({ collection: app.postAdTypes }));
    },

    onAttach() {},

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