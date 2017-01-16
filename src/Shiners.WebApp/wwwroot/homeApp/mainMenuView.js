/**
 * Created by arutu_000 on 1/15/2017.
 */
import Marionette from 'backbone.marionette';
import template from './mainMenuView.hbs.html';
import app from './app.js';

var View = Marionette.View.extend({
    template:template,
    onRender() {
        this.listenTo(app.user, 'login', this.toggleMenuItems);
        this.listenTo(app.user, 'logout', this.toggleMenuItems);
        this.listenTo(app.router,'route',this.setActiveItemForCurrentRoute);

    },
    onAttach() {
        //this.onClickLink();
        this.toggleMenuItems();
    },
    // custom:
    toggleMenuItems() {
        if(app.user.has('_id'))
            this.$('.js-need-auth').show();
        else {
            this.$('.js-need-auth').hide();
        }
    },
    setActiveItemForCurrentRoute() {
        this.$('.main-menu-item').each((i, el) => {
            if (el.dataset.routeName === app.router.currentRoute) {
                this.$('.main-menu-item').removeClass('active');
                $(el).addClass('active');
            }
        })
    }
});
export default View;