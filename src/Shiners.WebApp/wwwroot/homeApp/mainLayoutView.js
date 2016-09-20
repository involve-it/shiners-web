import Marionette from 'backbone.marionette';
import template from './MainLayoutView.hbs.html';
import _ from 'underscore';
import MapView from './MapView.js';
import BannerView from './BannerView.js';


var View = Marionette.View.extend({

    template:template,
    app:null,
    id:"wrapper",

    mapView:null,

    regions: {
        'content':'#appContent',
        'map':'#appMap',
        'banner':'#appBanner'
    },

    initialize(setts) {
        this.app = setts.app;
    },

    onRender() {
        this.renderMapAndBanner();
        this.listenTo(this.app.router,'route',this.toggleMapAndBanner);
    },

    renderMapAndBanner() {
        this.showChildView('map',new MapView({collection:this.app.nearbyPosts}));
        this.showChildView('banner',new BannerView());
    },

    toggleMapAndBanner(routeName) {
        if (routeName === "index") {
            this.getRegion('map').$el.show();
            this.getRegion('banner').$el.show();
        } else {
            this.getRegion('map').$el.hide();
            this.getRegion('banner').$el.hide();
        }
    }
});
export default View;