import Marionette from 'backbone.marionette';
import template from './SuggestionItemView.hbs.html';
var View = Marionette.View.extend({
    template:template,
    tagName:'a',
    initialize() {
        var nameParts = this.model.get('display_name').split(', ');
        this.model.set('name', nameParts[0] + ', ' + nameParts[1]);
        this.model.set('country',nameParts[nameParts.length-1]);
    },

    events: {
        'click':'onClick'
    },
    onClick() {
        this.trigger('location:selected',this.model);
    }
});
export default View;