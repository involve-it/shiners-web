import Marionette from 'backbone.marionette';
import template from './LoginView.hbs.html';
import './loginView.less';
import app from '../app.js';
import LoginModel from '../../data/viewModels/LoginModel'
var View = Marionette.View.extend({

    template:template,

    model:new LoginModel,

    initialize() {
        this.listenTo(app.user, 'login', this.redirect);
        this.listenTo(app.user, 'error:login', this.showError);
    },

    onAttach() {
        Backbone.Validation.bind(this);
        // add returnUrl for navigating from register page:
        if (this.options.returnUrl) {
            this.$('.js-login-register-link').attr('href', this.$('.js-login-register-link').attr('href') + this.options.returnUrl);
        }
    },

    events:{
        'submit form':'onSubmit',
        'change input':'onChange'
    },

    onSubmit(e) {
        e.preventDefault();
        if (!this.model.validate()) {
            // turn on spinner:
            $h.ui.spinnerShowOn$element(this.$('button i.fa'));
            app.authorize(this.model.get('email'), this.model.get('password'));
        }
    },

    onChange(e) {
        var val = e.target.value,
            name = e.target.name;
        this.model.set(name,val,{validate:true});
    },

    onBeforeRender() {
        this.templateContext= {
            returnUrl:this.options.returnUrl?decodeURIComponent(this.options.returnUrl) :null
        }
    },

    redirect() {
        if(this.options.returnUrl) {
            app.router.navigate(decodeURIComponent(this.options.returnUrl),  {trigger:true,replace:true});
        } else {
            history.back();
        }
    },

    showError(error) {
        $h.ui.spinnerHideOn$element(this.$('button i.fa'));
        $h.ui.alert("Ошибка! Неверно указаны имя пользователя или пароль");
    },

    onBeforeRemove() {
        Backbone.Validation.unbind(this);
    }
});
export default View;