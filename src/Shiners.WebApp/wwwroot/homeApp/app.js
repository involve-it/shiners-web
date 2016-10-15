import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
//import SockJS from 'SockJS';
import '../lib/detectmobile.js';
import Asteroid from '../lib/asteroid.browser.js';
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
    isMobile:false,
    router:null,

    initialize() {
        this.asteroid = new Asteroid("www.shiners.mobi",true);
        this.user = new AsteroidModel(null,{asteroid:this.asteroid});
        this.postAdTypes = new Collection(null, { asteroid: this.asteroid });
        this.myPosts=new Collection(null, { asteroid: this.asteroid });  
        this.nearbyPosts = new Collection(null,{asteroid:this.asteroid});
        this.router = new Router({app:this});
        this.layout = new RootView({app:this});
    },

    onStart() {
        this.isMobile = $.browser.mobile;
        this.postAdTypes.loadByMethod('getPostAdTypes');
        this.showView(this.layout);
        this.getPosition();
        this.checkLogin();
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
    },

    checkLogin() {
        var user = this.user;
        if (document.cookie["userId"]) {
            user.set('_id', document.cookie["userId"]);
            user.loadByMethod('getUser', [user.get('_id')],()=>user.trigger('login'));
        }
    },

    authorize(email,password) {
        var user=this.user;
        this.asteroid.loginWithPassword(email, password)
            .then((loginResult) => {
                user.set('_id', loginResult);
                //document.cookie["userId"] = loginResult;
                user.loadByMethod('getUser', [loginResult],()=>user.trigger('login'));               
            }).catch((error) => {
                user.trigger('error:login', error);
                console.error('Error:', error);
            });
    },

    logout() {
        var user = this.user;
        this.asteroid.logout().then(() => {
            user.unset('_id');
            user.unset('id');
            //delete document.cookie["userId"];
            user.trigger('logout');
        });
    }
});

export default new App();