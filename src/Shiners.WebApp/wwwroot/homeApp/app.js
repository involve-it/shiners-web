
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
    postAdTypes:null,

    router:null,

    initialize() {
        this.asteroid = new Asteroid("www.shiners.mobi",true);
        this.user = new AsteroidModel(null,{asteroid:this.asteroid});
        this.postAdTypes = new Collection(null, { asteroid: this.asteroid });
        this.myPosts=new Collection(null, { asteroid: this.asteroid });
        
        this.nearbyPosts = new Collection(null,{asteroid:this.asteroid});
        this.router = new Router({app:this});
        var rootView = new RootView({app:this});
        this.layout = rootView;
    },

    onStart() {
        this.postAdTypes.loadByMethod('getPostAdTypes');
        this.showView(this.layout);
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
            type:'POST'
        }).done((resp) => {
            if (resp.location) {
                app.user.set('location',resp.location);
            } else {
                console.error('geolocation not working');
            }
        }).fail(() => console.error('connection error to google geolocation api'))
            .always(() => app.startHistory());
    }
});

export default new App();