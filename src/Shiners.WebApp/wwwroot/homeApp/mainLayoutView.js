﻿import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from './mainLayoutView.hbs.html';
import _ from 'underscore';
import MapView from './MapView.js';
import BannerView from './BannerView.js';
import UserBarView from './UserBarView.js';
import NavLocationView from './NavLocationView.js';
import app from './app.js';
import IframeView from './shared/iframeView.js';
import UserMenuView from './layout/userMenuView';
import MainMenuView from './mainMenuView';


var View = Marionette.View.extend({

    template:template,
    id:"wrapper",
    mapView:null,

    events: {
        'change #chooseLanguage':'chooseLanguage'
    },

    regions: {
        'content':'#appContent',
        'map':'#appMap',
        'banner':'#appBanner',
        'userBar':'#userBar',
        'navLocation':'#navLocation',
        'mainMenu':'#bzMainMenu',
        'modal':'#modalContainer'
    },

    initialize() {},

    onClickLink() {
        Backbone.$(document).on('click', 'a:not([data-direct-link])a:not([href^=http])', function (e) {//not data-direct-link class AND not having http in beginning of href
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
        this.renderMainMenu();
        this.listenTo(app.router,'route',this.toggleMapAndBanner);
        //this._adaptUiIfIsIframe();
        //this.listenTo(app.user, 'receivedMeteorUser', this._toggleUserInfo);
        //this._loadIframeView();
    },

    onAttach() {
        this.onClickLink();
    },

    renderMapAndBanner() {
        var searchModel = new Backbone.Model({radius:1});
        this.showChildView('map',new MapView({collection:app.nearbyPosts,model:searchModel}));       
        this.showChildView('banner',new BannerView({model:searchModel}));
        this.showChildView('navLocation', new NavLocationView({model:searchModel}));
        this.showChildView('userBar', new UserBarView({ model: app.user }));
    },
    renderMainMenu() {
        this.showChildView('mainMenu',new MainMenuView());
    },

    showChangeLocation() {
        //Показать модальное окно.
        this.getChildView('banner').showSuggestionsModalView();
        //this.getChildView('banner').renderLocationsSelection();
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

            this.getRegion('banner').$el.show();
            /*if (!app.isMobile)
                this.getRegion('banner').$el.show();
            else
                this.hideFooter();
            */                      

            if(window.google)
                window.google.maps.event.trigger(app.map, 'resize');
        } else {
            this.showFooter();
            this.getRegion('map').$el.hide();
            this.getRegion('banner').$el.hide();
        }
    },

    hideFooter() {
        this.$('#footer').hide();
    },
    showFooter() {
        this.$('#footer').show();
    },

    chooseLanguage(e) {
        app.i18n.setLanguage(e.target.value);
        app.trigger('change:language', e.target.value);
    },

    _toggleUserInfo(user) {
        var view = new UserMenuView({ 
            model: new Backbone.Model(user)
        });
        view.render();
        this.$('#userBar .quick-cart').hide();
        this.$('#userBar ul').append(view.$el);
        this.$('#userBar').show();

        // other menu items:
        this.$('.js-need-auth').show();
    },
    _adaptUiIfIsIframe() {
        var isIframe = $h.help.getUrlParams().isiframe;
        if (isIframe === 'true') {
            this.$('#header').hide();
            this.hideFooter();
            // hide all post-beginning links (we don't want user to go somewhere)
            setTimeout(() => {
                $('a[href^="/posts/"]').each((i, a) => {
                    $(a).hide();
                });
            }, 1000);
        }
    },
    _loadIframeView() {
        setTimeout(()=> {
            if (!app.views.iframeView) {
                var iView = new IframeView({
                    //pagePath: 'posts/new'
                });
                iView.render();
                app.views.iframeView = iView;
            }
        }, 2000); // let's assume main page is loaded by this time
    }
});
export default View;