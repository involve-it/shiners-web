import Marionette from 'backbone.marionette';
import ItemView from './SuggestionItemView.js';
import app from '../app.js';
var View = Marionette.CollectionView.extend({
    childView:ItemView,
    tagName:'div',
    className:'suggestion-box-wrapper',
    childViewEvents: {
        'location:selected':'setAddress'
    },

    setAddress(model) {
        app.map.setCenter({
            lat:parseFloat(model.get('lat')),
            lng:parseFloat(model.get('lon'))
        });
    }
});
export default View;