import Marionette from 'backbone.marionette';
import template from './DetailsView.hbs.html';
import '../../lib/owl-carousel/owl.carousel.min.js';
import Collection from '../../data/AsteroidCollection.js';
import RelatedPostsView from './RelatedPostsView.js';
import _ from 'underscore';
import app from '../app.js';
import locationHelper from '../../helpers/locationHelper.js';
var View = Marionette.View.extend({
    
    template:template,
    collection:null,
    regions: {
        'related':'#relatedPostsContainer'
    },

    initialize() {
        window.postDetails = this.model.toJSON();
        this.collection = new Collection(null,{asteroid:this.model.asteroid});
        this.listenTo(this.collection, 'after:load', this.showRelatedPosts);
    },

    onAttach() {
        this.initVkSocialButton(); 
        this.initCarousel();
        var center = app.map.getCenter();
        //this.collection.loadByMethod('searchPosts', ['',center.lat(),center.lng(),200,0,10]);
        this.collection.loadByMethod('getPopularPosts',[center.lat(),center.lng(),200,0,10]); 
    },

    onBeforeRender() {
        this.setModelDistance();
    },

    initVkSocialButton(){     
        var details = this.model.get('details');
        var options = {
            pageTitle:details.title,
            pageDescription:details.description,
            pageImage:details.photos && details.photos.length>0?details.photos[0].data:null,
            type:'button'
        };      
        VK.Widgets.Like("vk_like",options,this.model.id);
        app.FbButton(this.$('#fb_like').get(0));
    },

    setModelDistance() {
        var locations = this.model.get('details').locations;
        if (locations && _.size(locations) > 0 && app.user.has('position')) {
            var location = _.find(locations, function(l) { return l.placeType === 'dynamic'; });
            if (!location)
                location = locations[0];
            var dist = locationHelper.getDistance(location.coords.lat,
                location.coords.lng,
                app.user.get('position').lat,
                app.user.get('position').lng);
            this.model.set('distance',dist );
            this.model.set('distanceType', 'km');
        } else {
            this.model.set('distance',-1);
        }       
    },
    initCarousel() {
        var slider 		= this.$('#postImages');
        var options 	= slider.attr('data-plugin-options');
        var defaults = {
            //items: 5,
            itemsCustom: false,
            //itemsDesktop: [1199, 4],
            //itemsDesktopSmall: [980, 3],
            //itemsTablet: [768, 2],
            //itemsTabletSmall: false,
            //itemsMobile: [479, 1],
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

    showRelatedPosts() {
        this.showChildView('related', new RelatedPostsView({ collection: this.collection }));
    }
});
export default View;