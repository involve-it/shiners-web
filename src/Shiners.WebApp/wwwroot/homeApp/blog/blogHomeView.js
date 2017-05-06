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
        this.fakeCollection = this._adaptCollection();

        this.blogItems = new Collection(null, {asteroid: this.asteroid});        
        //this.listenTo(app.user,'login',this.render);
        //this.listenTo(app.user, 'logout', this.render);
    },    
    _adaptCollection() {
        var ret, p;
        debugger;
        ret = this.options.collection.map((post)=> {
            
            p = post.toJSON();
            return _.extend({}, p, {
                id: p.id,
                timestamp: new Date(p.createdAt.$date),
                title: p.title,
                description: p.body,
                images: [
                    {
                        src: 'https://www.mos.org/sites/dev-elvis.mos.org/files/images/main/uploads/slides/imax_extreme-weather_tornado.jpg',
                        alt: '�����-�� �����'
                    },
                    {
                        src: 'https://www.mos.org/sites/dev-elvis.mos.org/files/images/main/uploads/slides/imax_extreme-weather_tornado.jpg',
                        alt: '�����-�� �����'
                    }
                ],
                comments: [],
                author: 'Shiners',
                //categories: ['shiners','news', 'tutorials'],
                tags: p.tags[0].split(' ')
            });
        });

        return new Backbone.Collection(ret);
    },
    onBeforeRender() {
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