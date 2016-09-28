import template from './SearchView.hbs.html';
import Backbone from 'backbone';
import '../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.min.css';
import '../lib/jquery-ui-slider-pips/dist/jquery-ui-slider-pips.js';
import '../lib/jquery-slimscroll/jquery.slimscroll.min.js';
import ShinersListView from './ShinersListView.js';

var View = Backbone.Marionette.View.extend({
    
    template:template,
    className:'contact-over-box',
    events: {
        'click #searchParametersButton':'toggleSearchParameters',
        'change #radius':'changeRadius',
        'change #query':'changeQuery'
    },
    regions: {
        shiners:'#shinersList'
    },

    onRender() {
        this.showShiners();
    },

    onAttach() {
        this.initRadiusSlider();
    },

    showShiners() {
        this.showChildView('shiners', new ShinersListView({collection:this.collection}));
    },

    changeRadius(e) {
        console.info('radius: '+e.target.value);
        this.model.set('radius', parseInt(e.target.value));
    },

    changeQuery(e) {
        console.info('query: '+e.target.value);
        var val = e.target.value;
        this.model.set('query', val);
    },

    initRadiusSlider() {
        var self=this;
        self.$("#slider3").slider({
            range: "min",
            animate: true,
            min: 2,
            max: 50,
            step: 10,
            value: 10,
            slide: (event, ui)=> {
                self.$("#radius").val(ui.value);
            }
        });
        self.$("#radius").val(self.$("#slider3").slider("value"));
        self.$("#slider3").slider("pips", { rest: "label" });
    },

    toggleSearchParameters() {
        this.$('#searchParameters').slideToggle(300);
    }
});
export default View;