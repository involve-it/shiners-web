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
        'hidden.bs.modal': 'hide',
        'shown.bs.modal':'onShow'
    },

    regions: {
        'childView':'.modal-body'
    },

    initialize(options) {
        this.model = new Backbone.Model({title:options.title||''});
        this.containerView = options.view;
    },

    hide() {
        this.$el.modal('hide');
    },    

    onShow() {
        this.showChildView('childView',this.containerView);
        this.listenToOnce(this.containerView,'destroy',this.hide);
        //detach
    },

    onAttach() {
        this.$el.modal();
    }
});