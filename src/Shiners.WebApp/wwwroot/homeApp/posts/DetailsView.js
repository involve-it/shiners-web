import Marionette from 'backbone.marionette';
import template from './DetailsView.hbs.html';
import '../../lib/owl-carousel/owl.carousel.min.js';
import Collection from '../../data/AsteroidCollection.js';
import RelatedPostsView from './RelatedPostsView.js';

import MapLoader from 'load-google-maps-api';

import _ from 'underscore';
import app from '../app.js';
import  './DetailsView.less';
import locationHelper from '../../helpers/locationHelper.js';
var View = Marionette.View.extend({
    
    map: null,
    postLocation: {},
    pinn: null,
    geocoder: null,
    template:template,
    collection:null,
    regions: {
        'related':'#relatedPostsContainer'
    },

    initialize() {
        window.postDetails = this.model.toJSON();
        this.collection = new Collection(null,{asteroid:this.model.asteroid});
        this.listenTo(this.collection, 'after:load', this.showRelatedPosts);
        this.listenTo(app.user,'login',this.render);
        this.listenTo(app.user, 'logout', this.render);
    },
    onBeforeRender() {
        this.setModelDistance();
        this.setModelPostComments();

        if (app.asteroid.loggedIn) {
            this.templateContext = {
                currentUser:app.user.toJSON()
            };
        }
    },

    onRender() {
        var center = app.map.getCenter();
        this.collection.loadByMethod('getPopularPosts',[center.lat(),center.lng(),200,0,10]);
        this.initVkSocialButton(); 
        this.initCarousel();
    },

    onAttach() {
        this.initStickMenu();
        this.initMapPost();
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

    setModelPostComments() {},

    initMapPost() {
        var defaultCoords = { lat: 55.75396, lng: 37.620393 };
        var postLocation = this.postLocation;    
        var center = postLocation || defaultCoords;

        this.map = new google.maps.Map(this.$('#sh-map')[0], {
            center: center,
            zoom: 14
        });

        this.showPostPin();
        
        //this.geocoder = new maps.Geocoder();
        app.map = this.map;
        //window.myMap = app.map; // debug
        //app.geocoder = this.geocoder;
    },

    getPostlocation(locations) {
        var postCoordinate = {};
        if(locations && _.size(locations) > 0) {
            var isDynamic = locations && _.find(locations, function(l){ return l.placeType==='dynamic';});
            if(isDynamic) {
                postCoordinate = {
                    lat: isDynamic.coords.lat,
                    lng: isDynamic.coords.lng
                }
                return postCoordinate;
            } else {
                postCoordinate = {
                    lat: locations[0].coords.lat,
                    lng: locations[0].coords.lng
                }
                return postCoordinate;
            }
        }
    },

    showPostPin() {
        var image = {
            url: '/images/shiners/shiner_marker.png',
            scaledSize: new window.google.maps.Size(25, 33),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(12, 33)
        };

        this.pinn = new window.google.maps.Marker({
            position: this.map.getCenter(),
            map: this.map,
            icon: image,
            title: 'Ваш пост тут'
        });

        window.pinn = this.pinn; // debug
    },

    setModelDistance() {
        var locations = this.model.get('details').locations;
        //console.log(locations);
        this.postLocation = this.getPostlocation(locations);
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
        var slider 		= this.$('#sh-carousel');
        //var slider 		= this.$('#postImages');
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

    initStickMenu() {

        setTimeout(function() {
            var navTabMenu = $('.sh-post-tab-menu-wrapper');

            if(navTabMenu.length > 0) {

                var navTabMenuTopPosition = navTabMenu.offset().top,
                    postTabMenuTopPosition = $('.sh-post-tab-menu').offset().top,
                    contentSections = $('.sh-section');

                $(window).scroll(function() {
                    
                    if ( $(window).scrollTop() > postTabMenuTopPosition + 12) {
                        $('.sh-post-tab-menu-wrapper').addClass('stick-menu');
                        $('.sh-post-tab-menu-sticky').removeClass('hidden');
                        $('.sh-content').addClass('has-top-margin');
                    }
                    else {                    
                        $('.sh-post-tab-menu-wrapper').removeClass('stick-menu');
                        $('.sh-post-tab-menu-sticky').addClass('hidden');
                        $('.sh-content').removeClass('has-top-margin');
                    }

                    updateNavigation();
                });

                //smooth scroll when clicking navTabMenu
                navTabMenu.find('ul a').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    var target= $(this.hash);
                    $('body, html').animate({
                        'scrollTop': target.offset().top - navTabMenu.height() + 1
                    }, 400);
                });

                function updateNavigation() {
                    contentSections.each(function() {
                        var actual = $(this),
                                actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
                                actualAnchor = navTabMenu.find('a[href="#'+actual.attr('id')+'"]');

                        if ( ( actual.offset().top - navTabMenu.height() - 12 <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - navTabMenu.height() - 12 > $(window).scrollTop() ) ) {
                            actualAnchor.addClass('active');
                        } else {
                            actualAnchor.removeClass('active');
                        }
                    });
                }
            }   
        }, 500);        
    },

    showRelatedPosts() {
        this.showChildView('related', new RelatedPostsView({ collection: this.collection }));
    }
});
export default View;