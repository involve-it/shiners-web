import Marionette from 'backbone.marionette';
import template from './BlogItemView.html';
import app from '../app'

var View = Marionette.View.extend({
    tagName:'div',
    className: 'blog-post-item',
    template:template,

    initialize() {}
});

export default View;