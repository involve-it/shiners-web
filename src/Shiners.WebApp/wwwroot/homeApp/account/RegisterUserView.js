import Marionette from 'backbone.marionette';
import template from './RegisterUserView.hbs.html';
import app from '../app.js';
import RegisterModel from '../../data/viewModels/RegisterModel'

var View = Marionette.View.extend({

    template:template,

    model:new RegisterModel,

    initialize() {
        this.listenTo(app.user, 'login', this.redirect);
        this.listenTo(app.user, 'error:create', this.showError);
    },

    onAttach() {
        Backbone.Validation.bind(this);
    },

    events:{
        'submit form':'onSubmit',
        'change input':'onChange'
    },

    onChange(e) {
        var val = e.target.value,
            name = e.target.name;
        this.model.set(name,val,{validate:true});
    },

    onSubmit(e) {
        e.preventDefault();
        if (!this.model.validate()) {
            app.registerUser(this.model.attributes);
        }       
    },

    redirect() {
        if(this.options.returnUrl)
            app.router.navigate(decodeURIComponent(this.options.returnUrl), {trigger:true,replace:true});
        else
            history.back();
    },

    showError(error) {
        alert("Ошибка! Имя пользователя уже существует");
    },

    onBeforeRemove() {
        Backbone.Validation.unbind(this);
    }
});
export default View;