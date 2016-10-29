import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import template from './iframeView.hbs.html';
import './iframeView.css';
import app from '../app.js';

window.app1 = app; // testing only!
const FRAME_DOMAIN = 'https://shiners.mobi';
//const FRAME_DOMAIN = 'http://localhost:3000';
class View extends Marionette.View.extend({
    template:template,
    
    events:{
        'load iframe':'iframeLoad'
    },
    iframeLoad(e) {
    },
    removeHeader(e) {
        window.myIframe = e.target;
    },

    onAttach() {
        //this.$el.height(window.innerHeight-$('#header').height());
    }

}) {
    constructor(options) {
        options = Object.assign({
            width: '100%',
            pagePath: '/home'
            //pathName: 'posts/new'
        }, options);

        super(options);
        this.options = options;
    }
    setPage(newPath) {
        this._updatePath(newPath)
    }
    _updatePath(newPath) {
        // trigger new path command to iFrame:
        this.sendMessage(this._addQsParamsToPath(newPath));
    }
    _addQsParamsToPath(url) {
        var ret = url;
        var latLngStr = '', position = app.user.get('position');
        if (position) {
            latLngStr = `&lat=${ position.lat }&lng=${ position.lng }`;
        }
        if (url.indexOf('isiframe') === -1) {
            if (url.indexOf('?') === -1) {
                ret += `?isiframe=true` + latLngStr; 
            } else {
                ret += `&isiframe=true` + latLngStr; 
            }
        }
        return ret;
    }
    serializeData() {
        var attr = this.options,
            that = this,
            src = function(a) { 
                var url = `${ FRAME_DOMAIN }${ attr.pagePath }`;
                url = that._addQsParamsToPath(url);  
                
                console.log('iframeview:serializeData:url: ', url);
                return url;
            }(),
            height = $(window).height() - ($('#header').height() + $('#footer').height());
        return {
            height,
            width: attr.width, 
            src
        }
    }
    onRender() {
        this._setMessageEvents();
        $('#iframeHolder').append(this.$el);
    }
    // inter-iframe communication:
    sendMessage(newPath) {
        window.iframeView.postMessage({
            pagePath: newPath
        }, "*");
    }
    _setMessageEvents() {
        var that = this;
        this.$('#iframeView').load(function() {
            console.log('iframeView:load')
        });
        this.listenTo(window, 'message', (e) => {
            //var origin = e.origin || e.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        });
        window.addEventListener("message", receiveMessage, false);

        function receiveMessage(event) {
            if(event.data && event.data.user) {
                // user-logged in event!
                if (!app.userMeteorObj) {
                    app.userMeteorObj = event.data.user;
                    app.user.trigger('receivedMeteorUser', event.data.user);
                }
            }
            event.data && event.data.height && that.$el.height(event.data.height);
            // some staff
            //var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
            //if (origin !== "http://example.org:8080")
              //  return;

            // ...
        }
    }
};
export default View;
