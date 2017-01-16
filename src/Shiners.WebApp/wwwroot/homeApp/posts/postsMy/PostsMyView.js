import Marionette from 'backbone.marionette';
import template from './PostsMyView.hbs.html';
import ItemView from  './PostItemView'
import app from '../../app.js';

var View = Marionette.CompositeView.extend({
    template:template,
    childView:ItemView,
    childViewContainer:'#myPostsContaner',
    onRender() {
    }
});
export default View;