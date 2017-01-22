/**
 * Created by arutu_000 on 1/15/2017.
 */
import Marionette from 'backbone.marionette';
import template from './mainMenuView.hbs.html';
import  './mainMenuView.less';
import app from './app.js';

var View = Marionette.View.extend({
    template:template,
    onRender() {
        var that = this;
        this.listenTo(app.user, 'login', this.toggleMenuItems);
        this.listenTo(app.user, 'logout', this.toggleMenuItems);
        this.listenTo(app.router,'route',this.setActiveItemForCurrentRoute);
        this.$('.navbar-collapse').on('shown.bs.collapse', function () {
            // do something…
            $(window).on('click', that.hideMobileCollapsableMenu);
        })
        this.$('.navbar-collapse').on('hidden.bs.collapse', function () {
            // do something…
            $(window).off('click', that.hideMobileCollapsableMenu);
        })
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
    hideMobileCollapsableMenu(e) {
        if (e.target !== $('.sh-btn-mobile-menu').get(0)) {
            this.$('.navbar-collapse').collapse('hide');
        }
    },
    setActiveItemForCurrentRoute() {
        this.$('.main-menu-item').each((i, el) => {
            if (el.dataset.routeName === app.router.currentRoute) {
                this.$('.main-menu-item').removeClass('active');
                $(el).addClass('active');
            }
        })
    },
    events: {
        'click .main-menu-item': function(e) {

            $(e.target).find('>a').click();
        }

    }
});
export default View;