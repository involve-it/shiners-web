import Marionette from 'backbone.marionette';
import template from './IndexView.hbs.html';

export default Marionette.View.extend({
    
    template:template,
    regions: {
        search:'#searchView'
    },


    initialize() {
        
    },

    onRender() {
        
    }


});