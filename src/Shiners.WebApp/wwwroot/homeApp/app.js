import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import i18n from '../js/controllers/templateController.js';
import '../i18n/en.js';
import '../i18n/ru.js';
import '../lib/detectmobile.js';
//import "ddp.js";
//import Asteroid from '../lib/asteroid.browser.js';
const AsteroidModule = require('asteroid');
import RootView from './mainLayoutView.js';
import Collection from '../data/AsteroidCollection.js';
import Router from './router.js';
import _ from 'underscore';

import ModalView from '../sharedViews/ModalContainerView.js';
import SuggestionsModalView from './selectLocation/suggestionsModal/SuggestionsModalView.js';

import AsteroidModel from '../data/AsteroidModel.js';
import PreloaderView from '../sharedViews/PreloaderView.js';
import '../css/shiners-override.css';
import $ from 'jquery';

let App = Marionette.Application.extend({
    region:'body',
    layout:null,
    asteroid:null,
    // application data
    nearbyPosts:null,
    messagesSubscription:null,
    myPosts:null,
    myChats:null,
    myMessages:null,
    user:null,
    postAdTypes:null,
    isMobile:false,
    router:null,
    //iframeLoaded:false,
    FbInitialized:false,
    i18n:i18n,
    views: {
        iframeView: null
    },
    initialize() { 
        /* web server */ 
        console.log(AsteroidModule);
        var Asteroid = AsteroidModule.createClass();
        this.asteroid = new Asteroid({
            endpoint: 'ws://shiners.mobi/websocket',

<<<<<<< HEAD
        })
        //this.asteroid = new Asteroid("www.shiners.mobi", true);

        ///* local server */
        ////this.asteroid = new Asteroid("192.168.1.38:3000", false);
=======
        /* local server */
        //this.asteroid = new Asteroid("192.168.1.34:3000", false);
>>>>>>> master

        //window.asteroid = this.asteroid; // debug        
        this.user = new AsteroidModel(null,{asteroid:this.asteroid});
        this.postAdTypes = new Collection(null, { asteroid: this.asteroid });
        this.myPosts = new Collection(null, { asteroid: this.asteroid });  
        this.myChats=new Collection(null, { asteroid: this.asteroid });
        this.nearbyPosts = new Collection(null,{asteroid:this.asteroid});
        this.myMessages = new Collection(null,{asteroid:this.asteroid});
        this.router = new Router({app:this});
        this.layout = new RootView();
    },

    onStart() {   
        this.showView(new PreloaderView); 
        var app = this;
        this.asteroid.on('connected',()=>app._startApp());
        this.listenMessages();
    },
        

    _startApp() {
        this.asteroid.off('connected');
        this.asteroid.on('loggedIn', () => {
            debugger;
        });
        this.isMobile = $.browser.mobile;
        this.postAdTypes.loadByMethod('getPostAdTypes');
        this.showView(this.layout);        
        this.initVkApi();
        this.initFbApi();
        this.getPosition();  

        this.asteroid.on('bz:onLoginError', (error) => this.user.trigger('error:login', error));
        this.asteroid.on('bz:onRegisterError', (error) => this.user.trigger('error:create', error));
        this.asteroid.on('loggedIn', _.bind(this.initUser,this));
        this.asteroid.on('loggedOut', _.bind(this.destroyUser,this));       
        if (this.asteroid.loggedIn) {
            this.initUser(this.asteroid.userId);
        }
    },
    /*
    FbButton(container) {
        if(!this.FbInitialized){
            FB.init({
                appId:'1024999790877408',
                version    : 'v2.8',
                status:true
            });
            this.FbInitialized=true;
        }
        if(container)
            FB.XFBML.parse(container); 
    },
    */
    initVkApi(){
        VK.init({
            //-> localhost:63957 
            apiId: 5413205,
            onlyWidgets: true
        }, function(err){
            console.log(err);
        });
    },

    initFbApi() {
        FB.init({
            appId:'1024999790877408',
            version: 'v2.8',
            cookie: true,
            xfbml: true,
            status: true
        });
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
                resp.location.detectionType = 'ip';
                app.user.set('position',resp.location);
            } else {
                console.error('geolocation not working');
            }
        }).fail(() => console.error('connection error to google geolocation api'))
            .always(() => app.startHistory());
    },

    authorize(email,password) {
        const asteroidInstance = this.asteroid;
        var options = {
            password: password
        }
        if (_.isEmail(email)) {
            options.email = email;
        } else {
            options.username = email;
        }
        asteroidInstance.loginWithPassword(options).catch((error) => {
            asteroidInstance.trigger('bz:onLoginError', error);
        });
    },

    registerUser(accountData) {
        debugger;

        const asteroidInstance = this.asteroid;
        this.asteroid.createUser(accountData).catch((error) => {
            debugger;
            asteroidInstance.trigger('bz:onRegisterError', error);
        });
    },

    initUser(userId) {
        this.user.set('_id',userId);
        this.user.loadByMethod('getUser', _.bind(() => this.user.trigger('login'),this));
    },

    logout() {
        this.asteroid.logout();
    },

    setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    },

    destroyUser() {
        this.user.unset('_id');
        this.user.unset('id',{silent:true});
        this.user.trigger('logout');
    },

    listenMessages() {
        this.messagesSubscription = this.asteroid.subscribe('messages-new');
        var app = this;
        this.asteroid.ddp.on("added", ({collection, id, fields}) => {
            app.trigger("add:message", fields);
        });
        this.asteroid.ddp.on("removed", ({collection, id, fields}) => {
            app.trigger("remove:message", fields);
        });
    },

    showModalApp(options) {
        app.layout.showChildView('modal', new ModalView( {view: new SuggestionsModalView({model: options.model }), title:options.title} ));
    }
});

var app = new App()
global.app = app;
global.$ = $;
export default app;