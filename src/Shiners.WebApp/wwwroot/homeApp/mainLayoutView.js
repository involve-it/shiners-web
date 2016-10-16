import Marionette from 'backbone.marionette';
import template from './MainLayoutView.hbs.html';
import _ from 'underscore';
import MapView from './MapView.js';
import BannerView from './BannerView.js';
import UserBarView from './UserBarView.js';
import app from './app.js';

var View = Marionette.View.extend({

    template:template,

    id:"wrapper",

    mapView:null,

    regions: {
        'content':'#appContent',
        'map':'#appMap',
        'banner':'#appBanner',
        'userBar':'#userBar'
    },

    onClickLink() {
        Backbone.$(document).on('click', 'a:not([data-direct-link])', function (e) {
            var href = Backbone.$(this).attr('href');
            var protocol = this.protocol + '//';
            if (href && !_.isEmpty(href) && href.slice(protocol.length) !== protocol) {
                e.preventDefault();
                app.router.navigate(href, true);
            }
        });
    },

    onRender() {
        this.renderMapAndBanner();
        this.listenTo(app.router,'route',this.toggleMapAndBanner);
    },

    onAttach() {
        this.onClickLink();
    },

    renderMapAndBanner() {
        var searchModel = new Backbone.Model();
        this.showChildView('map',new MapView({collection:app.nearbyPosts,model:searchModel}));       
        this.showChildView('banner',new BannerView({model:searchModel}));
        this.showChildView('userBar', new UserBarView({ model: app.user }));
    },

    toggleBannerView() {
        if (this.getRegion('banner').$el.is(':hidden')) {
            this.getRegion('banner').$el.show();
        } else {
            this.getRegion('banner').$el.hide();
        }
    },

    toggleMapAndBanner(routeName) {
        if (routeName === "index") {
            this.getRegion('map').$el.show();
            if(!app.isMobile)
                this.getRegion('banner').$el.show();
        } else {
            this.getRegion('map').$el.hide();
            this.getRegion('banner').$el.hide();
        }
    }
});
export default View;