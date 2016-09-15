import Backbone from 'backbone';
import Asteroid from 'asteroid.browser';
import RootView from './MainLayoutView.js';
import Collection from '../data/AsteroidCollection';
import Handlebars from "../../node_modules/handlebars/runtime.js";
import MomentHandler from "handlebars.moment";
import Router from './Router.js';
let App = Backbone.Marionette.Application.extend({
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
        var rootView = new RootView();
        this.layout = rootView;
        this.showView(rootView);
        this.router = new Router();
        Backbone.history.start();
    }
});

export default new App();