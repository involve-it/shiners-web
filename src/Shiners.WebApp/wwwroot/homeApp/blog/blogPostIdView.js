import Marionette from 'backbone.marionette';
import template from './blogPostIdView.hbs.html';
import '../../lib/owl-carousel/owl.carousel.min.js';
import '../../lib/magnific-popup/dist/jquery.magnific-popup.min.js';
import _ from 'underscore';
import app from '../app.js';
import './blogPostIdView.less';

var View = Marionette.View.extend({

    template:template,

    initialize() {
        console.log('POST ID -> MODEL: ', this.model);
    },

    onAttach() {
        this.initLightBox();
        this.initCarousel();
    },

    onRender() {},

    initCarousel() {
        var slider 		= this.$('#sh-blog-carousel');
        var options 	= slider.attr('data-plugin-options');
        var defaults = {
            //items: 5,
            itemsCustom: false,
            singleItem: true,
            itemsScaleUp: false,

            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1000,

            autoPlay: false,
            stopOnHover: false,

            navigation: false,
            navigationText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            rewindNav: true,
            scrollPerPage: false,

            pagination: true,
            paginationNumbers: false,

            responsive: true,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: window,

            baseClass: "owl-carousel",
            theme: "owl-theme",

            lazyLoad: false,
            lazyFollow: true,
            lazyEffect: "fade",

            autoHeight: false,

            jsonPath: false,
            jsonSuccess: false,

            dragBeforeAnimFinish: true,
            mouseDrag: true,
            touchDrag: true,

            transitionStyle: false,

            addClassActive: false,

            beforeUpdate: false,
            afterUpdate: false,
            beforeInit: false,
            afterInit: false,
            beforeMove: false,
            afterMove: false,
            afterAction: false,
            startDragging: false,
            afterLazyLoad: false
        };
        var config = $.extend({}, defaults, options, slider.data("plugin-options"));
        slider.owlCarousel(config).addClass("owl-carousel-init");
    },

    initLightBox() {     

    }
});

export default View;