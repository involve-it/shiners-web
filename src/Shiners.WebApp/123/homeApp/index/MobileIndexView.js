import Marionette from 'backbone.marionette';
import template from './MobileIndexView.hbs.html';
var View = Marionette.View.extend({
    regions: {
        'index':'#indexContainer'
    },
    template:template,
    IndexView:null,
    initialize(opts) {
        this.IndexView = opts.IndexView;
    },

    onRender() {
        this.showIndex();
    },

    showIndex() {
        this.showChildView('index', new this.IndexView());
    }
});
export default View;