import Marionette from 'backbone.marionette';
import template from './PostTypeItemView.html';
import app from '../app'
var View = Marionette.View.extend({
    tagName:'span',
    template:template,
    onBeforeRender() {
        this.templateContext= {
            currentLang:app.i18n.getLanguage()
        }
    },

    initialize() {
        this.listenTo(app, 'change:language', this.render);
    }
});
export default View;