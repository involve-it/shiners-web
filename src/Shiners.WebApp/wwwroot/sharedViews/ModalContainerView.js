import Marionette from 'backbone.marionette';
import template from './ModalContainerView.hbs.html'
export default Marionette.View.extend({
    template:template,
    className:'modal fade',

    containerView:null,

    attributes: {
        'tabindex':'-1',
        'role':'dialog',
        'aria-hidden':'true'
    },

    events: {
        'hidden.bs.modal': 'remove',
        'shown.bs.modal':'onShow'
    },

    regions: {
        'childView':'.modal-body'
    },

    initialize(options) {
        this.model = new Backbone.Model({title:options.title||''});
        this.containerView = options.view;
    },

    onShow() {
        this.showChildView('childView',this.containerView);
    },

    onAttach() {
        this.$el.modal();
    }
});