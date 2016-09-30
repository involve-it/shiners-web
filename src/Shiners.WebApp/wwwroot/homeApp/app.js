
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Asteroid from 'asteroid.browser';
import RootView from './MainLayoutView.js';
import Collection from '../data/AsteroidCollection.js';
import Router from './Router.js';
import _ from 'underscore';
import AsteroidModel from '../data/AsteroidModel.js';
let App = Marionette.Application.extend({
    region:'body',
    layout:null,
    asteroid:null,
    // application data
    nearbyPosts:null,
    myPosts:null,
    user:null,
    router:null,

    onStart() { 
        this.user = new AsteroidModel();
        this.asteroid = new Asteroid("www.shiners.mobi",true);
        this.nearbyPosts = new Collection(null,{asteroid:this.asteroid});
        this.router = new Router({app:this});
        var rootView = new RootView({app:this});
        this.layout = rootView;
        this.showView(rootView);
        this.getPosition();
    },

    supportsHistoryApi () {
        return !!(window.history && history.pushState);
    },

    startHistory() {
        Backbone.history.start({pushState: this.supportsHistoryApi()});
    },

    getPosition() {
        var app = this;
        $.ajax({
            dataType: "json",
            url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAuVoCXgaA7oR1sr49WEcdD3sBA7MzUANk',
            type:'POST',
            context:this
        }).done((resp) => {
            if (resp.location) {
                console.info(this);
                app.user.set('location',resp.location);
            } else {
                console.error('geolocation not working');
            }
        }).fail(() => console.error('connection error to google geolocation api'))
            .always(() => app.startHistory());
    }
});

export default new App();