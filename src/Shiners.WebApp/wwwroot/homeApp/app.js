
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Asteroid from 'asteroid.browser';
import RootView from './MainLayoutView.js';
import Collection from '../data/AsteroidCollection.js';
import Handlebars from "../../node_modules/handlebars/runtime.js";
import MomentHandler from "handlebars.moment";
import Router from './Router.js';
import _ from 'underscore';
let App = Marionette.Application.extend({
    region:'body',
    layout:null,
    asteroid:null,
    // application data
    nearbyPosts:null,
    myPosts:null,
    user:null,

    router:null,

    initTemplateHelpers() {
        MomentHandler.registerHelpers(Handlebars);
    },

    onStart() {
        this.initTemplateHelpers();
        this.asteroid = new Asteroid("www.shiners.mobi",true);
        this.nearbyPosts = new Collection(null,{asteroid:this.asteroid});
        this.router = new Router({app:this});
        var rootView = new RootView({app:this});
        this.layout = rootView;
        this.showView(rootView);
        
        Backbone.history.start({pushState: true});
        var self = this;
        $(document).on('click', 'a:not([data-direct-link])', (e)=> {        
            var href = e.target.attributes["href"];
            if (href && !_.isEmpty(href)) {
                e.preventDefault();
                self.router.navigate(href, true);
            }
        });
    },

    supportsHistoryApi () {
        return !!(window.history && history.pushState);
    }
});

export default new App();