import Marionette from 'backbone.marionette';
import template from './BlogItemView.html';
import app from '../app'

var View = Marionette.View.extend({
    tagName:'div',
    className: 'blog-post-item',
    template:template,

    initialize() {
        console.log('-> MODEL: ', this.model.toJSON());
    },

    onBeforeRender() {
        this.templateContext = {
            description: this.getDescription()
        };
    },

    onAttach() {
        this.initCarousel();
    },

    getDescription() {
        var blogItem = this.model.toJSON(),
            textDescription = blogItem.excerpt,
            limit = 400;

        if(textDescription) {
            var tx = textDescription.slice(0, limit);
            tx += '...';
        }

        return tx;
    },

    initCarousel() {
        var slider 		= this.$("#sh-blog-carousel-" + this.model.get('id'));       
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
});

export default View;