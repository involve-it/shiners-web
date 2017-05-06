import Marionette from 'backbone.marionette';
import template from './PostsMyView.hbs.html';
import ItemView from  './PostItemView'
import app from '../../app.js';
import  './PostMyView.less';

var View = Marionette.CompositeView.extend({
    template:template,
    childView:ItemView,
    childViewContainer:'#myPostsContaner' 

});
export default View;