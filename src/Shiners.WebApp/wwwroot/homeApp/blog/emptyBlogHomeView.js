import Marionette from 'backbone.marionette';
import template from './emptyBlogHomeView.hbs.html';

var View = Marionette.View.extend({
    template: template,
    tagName: 'div',
    className: 'sh-empty-blog'
});

export default View;