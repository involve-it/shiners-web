import Marionette from 'backbone.marionette';
import template from './PreloaderView.hbs.html';
var View = Marionette.View.extend({
    
    template:template,
    id:'preloader'
});
export default View;