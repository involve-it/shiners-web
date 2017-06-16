import Marionette from 'backbone.marionette';
import template from './PreloaderInnerView.hbs.html';
var View = Marionette.View.extend({
    
    template:template,
    id:'inPreloader'
});
export default View;