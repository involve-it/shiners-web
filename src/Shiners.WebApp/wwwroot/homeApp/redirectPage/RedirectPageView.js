import Marionette from 'backbone.marionette';
import template from './RedirectPageView.hbs.html';

var View = Marionette.View.extend({
    template: template,
    link: null,
    
    initialize(options) {
        this.link = options.link;
        this.model = new Backbone.Model({title: options.title, device: options.device, linkStore: this.link});
    },
    
    onAttach() {
        setTimeout(function() {
            console.log('перенаправление');
        }, 5000);
    }
});

export default View;