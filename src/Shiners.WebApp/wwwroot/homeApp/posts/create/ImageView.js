import Marionette from 'backbone.marionette';
import template from './ImageView.hbs.html'
export default Marionette.View.extend({
    template:template,
    className:'img-item',
    modelEvents: {
        'change:data':'render'
    },
    events: {
        'click .removeImage':'onRemoveImage'
    },
    onRemoveImage() {
        this.model.collection.remove(this.model);
    }
});