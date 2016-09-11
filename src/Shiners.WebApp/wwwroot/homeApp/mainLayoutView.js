import Marionette from 'backbone.marionette';
import template from './MainLayoutView.hbs.html';
import LoadMap from 'load-google-maps-api';
import SearchView from './SearchView.js';
import _ from 'underscore';
import '../lib/jquery.appear.js';
import '../lib/jquery.countTo.js';
var View = Marionette.View.extend({
    template:template,
    id:"wrapper",
    regions: {
        search:'#searchView'
    },

    initialize(){
        this.listenTo(this.collection,'after:load',()=>{
        
            alert(this.collection.size());
        });
    },

    onRender() {
        this.showChildView('search', new SearchView());
        this.initCounters();
        this.initToggle();
        this.initMap();
    },



    initMap(){
        LoadMap({key:'AIzaSyCqCn84CgZN6o1Xc3P4dM657HIxkX3jzPY'}).then( _.bind((maps) => {
            var map;
            map = new maps.Map(document.getElementById('map2'),
            {
                center: { lat: 40.714545, lng: -74.007139 },
                zoom: 14,
                scrollwheel: false
            });
            map.addListener('bounds_changed',_.bind((e)=>{
                this.collection.loadByMethod('getNearbyPosts',[e.latLng['lat'],e.latLng['lng']],this);
            },this));
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( (position)=> {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(pos);
                    this.collection.loadByMethod('getNearbyPosts',[pos['lat'],pos['lng']],this);
                },  ()=> {});
            } else {
                var center = map.getCenter();
                this.collection.loadByMethod('getNearbyPosts',[center['lat'],center['lng']],this);
            }
        },this) );
    },

    initCounters() {
        var self = this;
        setTimeout(function(){       
            self.$(".countTo").appear(function(){
                var _t 					= self.$(this),
                    _from 				= _t.attr('data-from') 				|| 0,
                    _speed 				= _t.attr('data-speed') 			|| 1300,
                    _refreshInterval 	= _t.attr('data-refreshInterval') 	|| 60;
                _t.countTo({
                    from: 				parseInt(_from),
                    to: 				_t.html(),
                    speed: 				parseInt(_speed),
                    refreshInterval: 	parseInt(_refreshInterval),
                });
            });
            self.$(".word-rotator").each(function () {
                var _t 				= self.$(this),
                    _items 			= _t.find(".items"),
                    items 			= _items.find("> span"),
                    firstItem 		= items.eq(0),
                    firstItemClone 	= firstItem.clone(),
                    _iHeight 		= self.$(this).height(),
                    _cItem 			= 1,
                    _cTop 			= 0,
                    _delay 			= self.$(this).attr('data-delay') || 2000;
                _items.append(firstItemClone);
                _t.height(_iHeight).addClass("active");
                setInterval(function() {
                    _cTop = (_cItem * _iHeight);
                    _items.animate({top: - (_cTop) + "px"}, 300, "easeOutQuad",function () {
                        _cItem++;
                        if(_cItem > items.length) {
                            _items.css("top", 0);
                            _cItem = 1;
                        }
                    });
                }, _delay);
            });    
        },100);
    },

    initToggle(){
		this.$("div.toggle > label").click(function(e) {
			var parentSection 	= $(this).parent(),
				parentWrapper 	= $(this).parents("div.toggle"),
				previewPar 		= false,
                previewParClosedHeight = 25,
				isAccordion 	= parentWrapper.hasClass("toggle-accordion");
			if(isAccordion && typeof(e.originalEvent) != "undefined") {
				parentWrapper.find("div.toggle.active > label").trigger("click");
			}
			parentSection.toggleClass("active");
			if(parentSection.find("> p").get(0)) {
				previewPar 					= parentSection.find("> p");
				var previewParCurrentHeight = previewPar.css("height");
				var previewParAnimateHeight = previewPar.css("height");
				previewPar.css("height", "auto");
				previewPar.css("height", previewParCurrentHeight);
			}
			var toggleContent = parentSection.find("> div.toggle-content");
			if(parentSection.hasClass("active")) {
				$(previewPar).animate({height: previewParAnimateHeight}, 350, function() {$(this).addClass("preview-active");});
				toggleContent.slideDown(350);
			} else {
				$(previewPar).animate({height: previewParClosedHeight}, 350, function() {$(this).removeClass("preview-active");});
				toggleContent.slideUp(350);
			}
		});
    }
});
export default View;