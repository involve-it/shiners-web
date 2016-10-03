import Marionette from 'backbone.marionette';
import template from './BannerView.hbs.html';
import selectionTemplate from './BannerViewLocationSelect.hbs.html';
import '../lib/jquery.countTo.js';
import app from './app.js';
var View = Marionette.View.extend({
    tagName: 'section',
    className: 'page-header page-header-xs',
    template: template,
    searchTimeOut: null,
    modelEvents: {
        'change:address': 'render'
    },

    events: {
        'click #selectLocation': 'renderLocationsSelection',
        'click #cancelSelection': 'render',
        'keyup #locationQuery': 'onLocationsSearch',
        'click #locationQuery':'showSuggestions'
    },

    onDomRefresh() {
        this.initCounters();
    },

    renderLocationsSelection() {
        this.template = selectionTemplate;
        this.render();
        this.template = template;
    },

    onLocationsSearch (e) {
        if (e && (e.keyCode > 31 || e.keyCode === 13 || e.keyCode === 8)) {
            if (this.searchTimeOut)
                clearTimeout(this.searchTimeOut);
            this.searchTimeOut = setTimeout(_.bind(function () {
                
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
    }
});
export default View;