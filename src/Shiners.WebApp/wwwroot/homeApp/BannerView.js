import Marionette from 'backbone.marionette';
import OsmCollection from '../data/OsmSearchCollection.js';
import template from './BannerView.hbs.html';
import selectionTemplate from './selectLocation/BannerViewLocationSelect.hbs.html';
import '../lib/jquery.countTo.js';
import app from './app.js';
import SuggestionsView from './selectLocation/SuggestionListView.js'
import './BannerView.less';

var View = Marionette.View.extend({
    tagName: 'div',
    className: 'sh-header-navbar-info visible-md-block visible-lg-block',
    template: template,
    searchTimeOut: null,
    osmCollection:null,
    modelEvents: {
        'change:address': 'render'
    },

    initialize() {
        this.osmCollection = new OsmCollection();
    },

    regions: {
        'suggestions':'#suggestionsListBox'
    },

    events: {
        'click #selectLocation': 'renderLocationsSelection',
        'click #cancelSelection': 'render',
        'keyup #locationQuery': 'onLocationsSearch',
        'click #locationQuery':'showSuggestions',
        'click #hideView':'hideView'
    },

    onDomRefresh() {
        if(!app.isMobile)
            this.initCounters();
    },

    renderLocationsSelection() {
        this.template = selectionTemplate;
        this.render();
        this.showChildView('suggestions',new SuggestionsView({collection:this.osmCollection,model:this.model }));
        this.template = template;
    },

    onLocationsSearch (e) {
        if (e && (e.keyCode > 31 || e.keyCode === 13 || e.keyCode === 8)) {
            if (this.searchTimeOut)
                clearTimeout(this.searchTimeOut);
            this.searchTimeOut = setTimeout(_.bind(function () {
                this.osmCollection.fetch({
                    data: {
                        q:e.target.value,
                        format:'json',
                        'accept-language':'ru',
                        limit:20,
                        polygon_geojson:0
                        //city:e.target.value,
                        //county:e.target.value,
                        //state:e.target.value,
                        //country:e.target.value
                    }
                });
            }, this), 400);
        }
    },

    showSuggestions(e) {
        var quickCartBox = this.$('#suggestionsBox');
        if(!quickCartBox.is(":visible")) {
            quickCartBox.fadeIn(300);
        }
    },

    initCounters() {
        var self = this;
        var $countTo = self.$(".countTo");
        var _from 				= $countTo.attr('data-from') 				|| 0,
            _speed 				= $countTo.attr('data-speed') 			|| 1300,
            _refreshInterval 	= $countTo.attr('data-refreshInterval') 	|| 60;
        $countTo.countTo({
            from: 				parseInt(_from),
            to: 				$countTo.html(),
            speed: 				parseInt(_speed),
            refreshInterval: 	parseInt(_refreshInterval)
        });
        var $wordRotator = this.$('.word-rotator');
        var _items = $wordRotator.find(".items");
        var items = _items.find("> span");
        var firstItem = items.eq(0);            
        var firstItemClone = firstItem.clone();
        var _iHeight = $wordRotator.height();
        var _cItem = 1;
        var _cTop = 0;
        var _delay = $wordRotator.attr('data-delay') || 2000;
        _items.append(firstItemClone);
        $wordRotator.height(_iHeight).addClass("active");
        setInterval(()=> {
            _cTop = (_cItem * _iHeight);
            _items.animate({top: - (_cTop) + "px"}, 300, "easeOutQuad", ()=> {
                _cItem++;
                if(_cItem > items.length) {
                    _items.css("top", 0);
                    _cItem = 1;
                }
            });
        }, _delay);
    },

    hideView() {
        app.layout.toggleBannerView();
    }
});
export default View;