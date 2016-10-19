import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import template from './iframeView.hbs.html';
import './iframeView.css';
import app from '../app.js';

// const FRAME_DOMAIN = 'https://shiners.mobi';
const FRAME_DOMAIN = 'http://localhost:3000';
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
            pathName: 'posts/new'
        }, options);

        super(options);
        this.options = options;
    }
    updatePath(newPath) {
        // trigger new path command to iFrame:
        this.sendMessage();
    }
    serializeData() {
        var attr = this.options,
            src = function(a) { 
                return `${ FRAME_DOMAIN }/${ attr.pagePath }?type=ad&isiframe=true`; 
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
    sendMessage() {
        window.iframeView.postMessage({
            pagePath: 'posts/new'
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

        function receiveMessage(event)
        {
            that.$el.height(event.data.height);
            var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
            //if (origin !== "http://example.org:8080")
              //  return;

            // ...
        }
    }
};
export default View;