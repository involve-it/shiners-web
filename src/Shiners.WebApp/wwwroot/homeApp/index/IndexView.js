import Marionette from 'backbone.marionette';
import template from './IndexView.hbs.html';
import LoadMap from 'load-google-maps-api';
import SearchView from './SearchView.js';
import ShinerInfoView from './ShinerInfoView.js';
export default Marionette.View.extend({
    map:null,
    shiners:[],
    fetchTimeOut:null,
    template:template,
    regions: {
        search:'#searchView'
    },

    initialize() {
        this.listenTo(this.collection,'after:load',this.showShiners);
    },

    onRender() {
        this.showChildView('search', new SearchView());
        this.initCounters();
        this.initToggle();
        this.initMap();
    },

    showShiners() {
        var image = {
            url: '../images/shiners/default_32.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new window.google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new window.google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new window.google.maps.Point(0, 32)
        };
        this.collection.each((model) => {         
            if (!_.find(this.shiners, (sh) => sh.modelId===model.id)) {
                var details = model.get('details');
                _.each(details.locations, (location) => {
                    var shiner = new window.google.maps.Marker({
                        position: {lat: location.coords.lat, lng: location.coords.lng},
                        map: this.map,
                        icon: image,
                        title: details.title
                    });
                    shiner.modelId = model.id;
                    shiner.addListener('click', _.bind(this.shinerInfo,this,shiner,model));
                    this.shiners.push(shiner);
                }, this);
            }
        },this);
    },

    shinerInfo(shiner,model,event) {
        var infoView = new ShinerInfoView({model:model});
        var infoWindow = new window.google.maps.InfoWindow({
            content: infoView.render().$el[0]
        });
        infoWindow.addListener('closeclick',() => {
            infoView.remove();
        });
        infoWindow.open(this.map, shiner);
    },

    initMap(){
        LoadMap({key:'AIzaSyCqCn84CgZN6o1Xc3P4dM657HIxkX3jzPY'}).then( _.bind((maps) => {
            this.map = new maps.Map(document.getElementById('map2'),
            {
                center: { lat: 55.75396, lng: 37.620393 },
                zoom: 14,
                scrollwheel: false
            });
            this.map.addListener('bounds_changed',_.bind(this.onBoundsChange,this));

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( _.bind(this.setMapPosition,this),  _.bind(this.setMapPosition,this,{ coords: {latitude:55.75396,longitude:37.620395} }));
            } else {
                this.fetchPosts();
            }
        },this) );
    },

    setMapPosition(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.map.setCenter(pos);
    },

    onBoundsChange() {
        if (this.fetchTimeOut)
            clearTimeout(this.fetchTimeOut);
        this.fetchTimeOut = setTimeout(_.bind(function () {
            this.fetchPosts();
        }, this), 500);
    },

    fetchPosts() {
        if (this.map.getZoom()>12) {
            var center = this.map.getCenter();
            this.collection.loadByMethod('getNearbyPosts',[center.lat(),center.lng()]);
        }
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
                    refreshInterval: 	parseInt(_refreshInterval)
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
            var previewParAnimateHeight;
            if(parentSection.find("> p").get(0)) {
                previewPar 					= parentSection.find("> p");
                var previewParCurrentHeight = previewPar.css("height");
                previewParAnimateHeight = previewPar.css("height");
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