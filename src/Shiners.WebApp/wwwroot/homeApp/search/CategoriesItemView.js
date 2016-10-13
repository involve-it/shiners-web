import Marionette from 'backbone.marionette';
import template from './CategoriesItemView.hbs.html';
var View = Marionette.CompositeView.extend({
    template:template,
    tagName:'li',
    events: {
        'click a':'toggleCheck'
    },

    initialize() {
        this.templateContext = {
            isChecked:false
        }
    },

    toggleCheck(e) {
        e.preventDefault();
        this.templateContext.isChecked = !this.templateContext.isChecked;       
        console.info('isChecked: '+this.templateContext.isChecked);
        this.render();
        this.trigger('check:category',this.model,this.templateContext.isChecked);
    }
});
export default View;