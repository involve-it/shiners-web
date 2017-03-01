import Marionette from 'backbone.marionette';
import template from './SuggestionsModalView.hbs.html';
import OsmCollection from '../../../data/OsmSearchCollection.js';
import _ from 'underscore';
import  './SuggestionsModalView.less';
import SuggestionsView from '../SuggestionListView.js';
import app from '../../app.js';

export default Marionette.View.extend({

    template: template,
    osmCollection:null,

    regions: {
        'suggestions':'#suggestionsListBox'
    },

    events: {
        'click #locationQuery':'showSuggestions',
        'keyup #locationQuery': 'onLocationsSearch'
    },

    initialize() {
        this.osmCollection = new OsmCollection();
    },

    onRender() {
        this.showChildView('suggestions',new SuggestionsView({collection:this.osmCollection,model:this.model }));
    },

    onLocationsSearch(e) {
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
    }
    
});
