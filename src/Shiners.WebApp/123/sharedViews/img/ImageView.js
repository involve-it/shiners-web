import Marionette from 'backbone.marionette';
import template from './ImageView.hbs.html';
var View = Marionette.View.extend({
    
    template:template,
    id:'preloader',
    initialize() {
        this.$el.css({
            'background-image':''
        });
    }
});
export default View;