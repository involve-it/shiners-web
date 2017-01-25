/**
 * Created by arutu_000 on 1/15/2017.
 */
import Marionette from 'backbone.marionette';
import template from './blogHomeView.hbs.html';
import './blogHomeView.less';

var View = Marionette.View.extend({
    template:template,
    initialize() {
        //window.postDetails = this.model.toJSON();
        debugger;
        this.collection = new Collection(null,{asteroid:this.model.asteroid});
        this.listenTo(this.collection, 'after:load', this.showBlogList);
        this.listenTo(app.user,'login',this.render);
        this.listenTo(app.user, 'logout', this.render);
    },
    showBlogList() {
        debugger;
    },
    onRender() {
        debugger;
    }
});
export default View;