import Marionette from 'backbone.marionette';
import template from './RegisterUserView.hbs.html';
import app from '../app.js';
import RegisterModel from '../../data/viewModels/RegisterModel'

var View = Marionette.View.extend({

    template:template,
    className: 'sh-auth-page',
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
            $h.ui.spinnerShowOn$element(this.$('button i.fa'));
            
            app.registerUser(this.model.attributes);
        }       
    },

    redirect() {
        if(this.options.returnUrl){
            var returnUrl = decodeURIComponent($h.help.getUrlParams()['returnUrl']);
            app.router.navigate(returnUrl, {trigger:true, replace:true});
        } else {
            history.back();
        }
    },

    showError(error) {
        debugger;
        $h.ui.spinnerHideOn$element(this.$('button i.fa'));
        $h.ui.alert(error && error.message || 'Error!');
    },

    onBeforeRemove() {
        Backbone.Validation.unbind(this);
    }
});
export default View;