import Marionette from 'backbone.marionette';
import template from './ConfirmView.hbs.html';
import Backbone from 'backbone';

var View = Marionette.View.extend({  
    template:template,
    className:'modal fade',

    attributes: {
        'tabindex':'-1',
        'role':'dialog',
        'aria-hidden':'true'
    },

    events: {
        'hidden.bs.modal': 'hide',
        'click .js-btn-not': 'btnNot',
        'click .js-btn-yes': 'btnYes',
    },

    btnNot(e) {
        var modelAnswer = this.model.get('answer');
        //Can i use try/catch here?
        if(modelAnswer) {
            modelAnswer.set('questions', false);
        }
    },

    hide(e) {
        this.$el.trigger('click', '[data-dismiss="modal"]');
    },

    btnYes(e) {
        var modelAnswer = this.model.get('answer');
        //Can i use try/catch here?
        if(modelAnswer) {
            modelAnswer.set('questions', true);
        }
        this.$el.triggerHandler('hidden.bs.modal');
    },

    initialize(options) {
        var opts = options || {};
        this.model = new Backbone.Model({answer: opts.answer, title: opts.title, message: opts.message || false});
    },

    onAttach() {
        this.$el.modal();
    }

});

export default View;
