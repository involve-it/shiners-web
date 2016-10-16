import Marionette from 'backbone.marionette';
import ItemView from './CategoriesItemView.js';
import _ from 'underscore';
var View = Marionette.CollectionView.extend({
    childView:ItemView,
    className:'list-unstyled uppercase',
    tagName:'ul',
    childViewEvents: {
        'check:category': 'onCheckCategory'
    },

    onCheckCategory(model,isChecked) {
        if (isChecked) {
            this.model.set('activeCats', _.union(this.model.get('activeCats') || [], [model.get('name')]));
        } else {
            this.model.set('activeCats', _.without(this.model.get('activeCats') || [], model.get('name')));
        }
        
    }
});
export default View;