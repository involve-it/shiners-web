
import template from './SearchView.hbs.html';
import Backbone from 'backbone';
import '../../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.min.css';
import '../../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.js';
import '../../lib/jquery-slimscroll/jquery.slimscroll.min.js';
import ShinersListView from './ShinersListView.js';
import CategoriesListView from './CategoriesListView.js';
import app from '../app.js';
var View = Backbone.Marionette.View.extend({
    fetchTimeOut:null,
    template:template,
    //className:'contact-over-box',
    events: {
        'click #searchParametersButton':'toggleSearchParameters',
        'keyup #query':'onTextSearch',
        'click div.toggle > label':'toggleResults',
        'click #userLocation':'toggleBannerView'
    },
    regions: {
        shiners:'#shinersList',
        categories:'#selectCategories'
    },

    onBeforeRender() {
        this.templateContext = {
            isMobile: app.isMobile
        };
    },

    onRender() {
        
        this.showShiners();
    },

    onAttach() {
        this.initRadiusSlider();
        this.showCategories();
        if (!app.isMobile) {
            this.toggleSearchParameters();
        }
    },

    showShiners() {
        this.showChildView('shiners', new ShinersListView({collection:this.collection}));
    },

    showCategories(){
        this.showChildView('categories', new CategoriesListView({model:this.model,collection:app.postAdTypes}));
    },

    onTextSearch: function (e) {
        if (e && (e.keyCode > 31 || e.keyCode === 13 || e.keyCode === 8)) {
            if (this.fetchTimeOut)
                clearTimeout(this.fetchTimeOut);
            this.fetchTimeOut = setTimeout(_.bind(function () {
                console.info('query: '+e.target.value);
                var val = e.target.value;
                this.model.set('query', val);
            }, this), 400);
        }
    },

    initRadiusSlider() {
        var self=this;
        self.$("#slider3").slider({
            range: "min",
            animate: true,
            min: 2,
            max: 50,
            step: 10,
            value: 10,
            slide: (event, ui)=> {
                self.model.set('radius', parseInt(ui.value));
                self.$("#radius").val(ui.value);
            }
        });
        self.$("#radius").val(self.$("#slider3").slider("value"));
        self.$("#slider3").slider("pips", { rest: "label" });
    },

    toggleSearchParameters() {
        this.$('#searchParameters').slideToggle(300);
    },

    toggleResults(e) {
        var previewParClosedHeight = 25;
        var parentSection 	= $(e.target).parent(),
				parentWrapper 	= $(e.target).parents("div.toggle"),
				previewPar 		= false,
				isAccordion 	= parentWrapper.hasClass("toggle-accordion");
		if(isAccordion && typeof(e.originalEvent) !== "undefined") {
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
			$(previewPar).animate({height: previewParAnimateHeight}, 350, ()=> $(e.target).addClass("preview-active"));
			toggleContent.slideDown(350);
		} else {
			$(previewPar).animate({height: previewParClosedHeight}, 350, ()=> $(e.target).removeClass("preview-active"));
			toggleContent.slideUp(350);
		}
    },

    toggleBannerView() {
        app.layout.toggleBannerView();
    }

    //toggleCategories() {
    //    this.getChildView('categories').$el.slideToggle(300);
    //}
});
export default View;