import Marionette from 'backbone.marionette';
import template from './MainLayoutView.hbs.html';
import _ from 'underscore';
import MapView from './MapView.js';
import BannerView from './BannerView.js';
import app from './app.js';

var View = Marionette.View.extend({

    template:template,

    id:"wrapper",

    mapView:null,

    events: {
        'click a:not([data-direct-link])':'onClickLink'
    },

    regions: {
        'content':'#appContent',
        'map':'#appMap',
        'banner':'#appBanner'
    },

    onClickLink(e) {
        var href = $(e.target).attr('href');
        if (href && !_.isEmpty(href)) {
            e.preventDefault();
            app.router.navigate(href, true);
        }
    },

    onRender() {
        this.renderMapAndBanner();
        this.listenTo(app.router,'route',this.toggleMapAndBanner);
    },

    renderMapAndBanner() {
        this.showChildView('map',new MapView({collection:app.nearbyPosts}));
        this.showChildView('banner',new BannerView({model:app.user}));
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