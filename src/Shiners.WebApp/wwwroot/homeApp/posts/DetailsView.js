import Marionette from 'backbone.marionette';
import template from './DetailsView.hbs.html';
import '../../lib/owl-carousel/owl.carousel.min.js';
import Collection from '../../data/AsteroidCollection.js';
import RelatedPostsView from './RelatedPostsView.js';
import _ from 'underscore';
import app from '../app.js';
var View = Marionette.View.extend({
    
    template:template,

    regions: {
        'related':'#relatedPostsContainer'
    },

    onRender() {
        this.showRelatedPosts();
    },

    onAttach() {
        this.initCarousel();
    },

    initCarousel() {
        var slider 		= this.$('#postImages');
        var options 	= slider.attr('data-plugin-options');
        var defaults = {
            items: 					5,
            itemsCustom: 			false,
            itemsDesktop: 			[1199,4],
            itemsDesktopSmall: 		[980,3],
            itemsTablet: 			[768,2],
            itemsTabletSmall: 		false,
            itemsMobile: 			[479,1],
            singleItem: 			true,
            itemsScaleUp: 			false,

            slideSpeed: 			200,
            paginationSpeed: 		800,
            rewindSpeed: 			1000,

            autoPlay: 				false,
            stopOnHover: 			false,

            navigation: 			false,
            navigationText: [
                                '<i class="fa fa-angle-left"></i>',
                                '<i class="fa fa-angle-right"></i>'
            ],
            rewindNav: 				true,
            scrollPerPage: 			false,

            pagination: 			true,
            paginationNumbers: 		false,

            responsive: 			true,
            responsiveRefreshRate: 	200,
            responsiveBaseWidth: 	window,

            baseClass: 				"owl-carousel",
            theme: 					"owl-theme",

            lazyLoad: 				false,
            lazyFollow: 			true,
            lazyEffect: 			"fade",

            autoHeight: 			false,

            jsonPath: 				false,
            jsonSuccess: 			false,

            dragBeforeAnimFinish: 	true,
            mouseDrag: 				true,
            touchDrag: 				true,

            transitionStyle: 		false,

            addClassActive: 		false,

            beforeUpdate: 			false,
            afterUpdate: 			false,
            beforeInit: 			false,
            afterInit: 				false,
            beforeMove: 			false,
            afterMove: 				false,
            afterAction: 			false,
            startDragging: 			false,
            afterLazyLoad: 			false
        }
        var config = $.extend({}, defaults, options, slider.data("plugin-options"));
        if (el == '#postImages' && _.size(this.model.get('details.photos')) <= 1)
            config.autoPlay = false;
        slider.owlCarousel(config).addClass("owl-carousel-init");
    },

    showRelatedPosts() {
        var collection = new Collection(null,{asteroid:this.model.asteroid});
        collection.loadByMethod('searchPosts', ['some query',app.position.lat,app.position.lng,200,0,10])
            .then(_.bind(() => {
                this.showChildView('related', new RelatedPostsView({collection:collection}));
            },this));        
    }
});
export default View;