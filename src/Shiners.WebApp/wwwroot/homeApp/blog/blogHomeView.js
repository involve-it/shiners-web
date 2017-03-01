/**
 * Created by arutu_000 on 1/15/2017.
 */
import Marionette from 'backbone.marionette';
import template from './blogHomeView.hbs.html';
import '../../lib/owl-carousel/owl.carousel.min.js';
import Collection from '../../data/AsteroidCollection.js';
import BlogItemsView from './BlogItemsView.js';
import _ from 'underscore';
import app from '../app.js';
import './blogHomeView.less';

//Fake instance
import Backbone from 'backbone';

var View = Marionette.View.extend({

    template:template,
    blogItems:null,
    className: 'sh-content',
    fakeCollection: null,

    initialize() {

        //Fake instance
        this.fakeCollection = new Backbone.Collection;       

        this.blogItems = new Collection(null, {asteroid: this.asteroid});        
        //this.listenTo(app.user,'login',this.render);
        //this.listenTo(app.user, 'logout', this.render);
    },    

    onBeforeRender() {
        
        /* DELETE AFTER FETCH REAL DATA */       
        this.fakeCollection.add([
            {
                id: '1',
                timestamp: new Date(),
                title: "Flying Dutchman",
                description: "1 There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
                images: [
                    {
                        src: 'https://www.mos.org/sites/dev-elvis.mos.org/files/images/main/uploads/slides/imax_extreme-weather_tornado.jpg',
                        alt: 'Какая-то фотка'
                    },
                    {
                        src: 'https://www.mos.org/sites/dev-elvis.mos.org/files/images/main/uploads/slides/imax_extreme-weather_tornado.jpg',
                        alt: 'Какая-то фотка'
                    }
                ],
                comments: [],
                author: 'Shiners',
                categories: ['shiners','news', 'tutorials'],
                tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4']
            },

            {
                id: '2',
                timestamp: new Date(),
                title: "Black Pearl",
                description: "2 There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
                images: [
                    {
                        src: 'https://www.mos.org/sites/dev-elvis.mos.org/files/images/main/uploads/slides/imax_extreme-weather_tornado.jpg',
                        alt: 'Какая-то фотка'
                    }
                ],
                comments: [],
                author: 'Shiners2',
                categories: ['finance','news', 'tutorials'],
                tags: ['tag 5', 'tag 2', 'tagг 3', 'tag 4']
            }
        ]);
        /* DELETE AFTER FETCH REAL DATA */
       
        this.templateContext = {
            blogDetails: this.getBlogDetails()
        };
    },
    
    getBlogDetails() {
        var details = {},
            blogData = this.fakeCollection.toJSON();

        if(blogData) {
            details.tags = ['tag1','tag2','tag3','tag4','tag5','tag6']
        }

        return details;
    },

    regions: {
        'blogItems':'#blog-items'
    },

    onAttach() {
        this.initCarousel();
    },     

    onRender() {
        //Если не ошибаюсь нужно использовать ateroid collection, но так как напрямую я не могу добавить фейковые модели,
        //использую обычныю коллекцию Backbone
        this.showChildView('blogItems', new BlogItemsView({ collection: this.fakeCollection }));       
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