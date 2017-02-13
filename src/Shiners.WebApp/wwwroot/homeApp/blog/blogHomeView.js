/**
 * Created by arutu_000 on 1/15/2017.
 */
import Marionette from 'backbone.marionette';
import template from './blogHomeView.hbs.html';
import '../../lib/owl-carousel/owl.carousel.min.js';
import Collection from '../../data/AsteroidCollection.js';
import app from '../app.js';
import './blogHomeView.less';

var View = Marionette.View.extend({

    template:template,
    collection:null,
    className: 'sh-content',

    initialize() {
        
        //debugger;

        //this.collection = new Collection(null,{asteroid:this.model.asteroid});
        this.listenTo(this.collection, 'after:load', this.showBlogList);
        this.listenTo(app.user,'login',this.render);
        this.listenTo(app.user, 'logout', this.render);
    },

    onAttach() {},

    showBlogList() {
        //debugger;
        console.log('SHOW BLOG LIST', showBlogList);
    },

    onRender() {
        //debugger;
        console.log('ON RENDER');
        this.initCarousel();
    },
    
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

    initMobileBtnBlog() {
        $("div.side-nav").each(function() {
            var _t = $('ul', this);
            $('button', this).bind("click", function() {
                _t.slideToggle(300);
            });
        });
    }

});
export default View;