
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import Asteroid from 'asteroid.browser';
import RootView from './MainLayoutView.js';
import Collection from '../data/AsteroidCollection.js';
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
    position: {
        lat:0,
        lng:0
    },
    router:null,

    onStart() {
        this.asteroid = new Asteroid("www.shiners.mobi",true);
        this.nearbyPosts = new Collection(null,{asteroid:this.asteroid});
        this.router = new Router({app:this});
        var rootView = new RootView({app:this});
        this.layout = rootView;
        this.showView(rootView);
        //this.getPosition();
        this.startHistory();
    },

    supportsHistoryApi () {
        return !!(window.history && history.pushState);
    },

    startHistory() {
        Backbone.history.start({pushState: this.supportsHistoryApi()});
    }

    //getPosition() {
    //    var app = this;
    //    $.ajax({
    //        dataType: "json",
    //        url: 'https://www.googleapis.com/geolocation/v1/geolocate',
    //        data: {key:'AIzaSyB6JoRSeKMn_yjz3Oip84N9YhX7B6djHLA'},
    //        context:this
    //    }).done((resp) => {
    //        if (resp.location) {
    //            app.position = resp.location;
    //            app.startHistory();
    //        } else {
    //            app.startHistory();
    //            console.error('geolocation not working');
    //        }
    //    }).fail(() => {
    //        app.startHistory();
    //        console.error('connection error to google geolocation api');
    //    });
    //}
});

export default new App();