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
        var thatLink = this.link;
        console.log(thatLink);
        window.setTimeout(function() {
            window.location.replace(thatLink);
        }, 10);
    }
});

export default View;