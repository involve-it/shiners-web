import Marionette from 'backbone.marionette';
import template from './LoginView.hbs.html';
import './loginView.less';
import app from '../app.js';
import LoginModel from '../../data/viewModels/LoginModel'
var View = Marionette.View.extend({

    template:template,
    className: 'sh-auth-page',
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
        'change input':'onChange',
        //'click #sh-auth-vk': 'authVk',
        //'click #sh-auth-facebook': 'authFacebook',
        //'click #sh-auth-google-plus': 'authGooglePlus'
    },

    authVk(e) {
        e.preventDefault();

        //Вызов окна авторизации пользователя
        VK.Auth.login(function(response) {
            if (response.session && response.status == 'connected') {
                /* Пользователь успешно авторизовался */

                var data = {};
                data = response.session;

                var user = {};
                user = response.session.user;

                VK.Api.call('users.get', { fields: 'sex,photo_50' }, function(res) {
                    if(res.response){
                        user.photo = res.response[0].photo_50;
                        user.gender = res.response[0].sex;

                        data.user = user;

                        $.ajax({
                            url: '/auth/vk',
                            method: 'POST',
                            data: data,
                            dataType: 'JSON',
                            success: function(res){
                                console.log(res);
                            }
                        });
                    }
                });

                console.log('Пользователь успешно авторизовался ', response);
                window.vkUser = response; //debug

                if (response.settings) {

                    /* Выбранные настройки доступа пользователя, если они были запрошены */

                }
            } else {

                /* Пользователь нажал кнопку Отмена в окне авторизации */
                console.log('Пользователь нажал кнопку Отмена в окне авторизации ', response);

            }
        }, 4194304);        

        //VK.Auth.login(function(res) {}, 4194304);
        console.log('CLICK VK', e.currentTarget);
    },

    authFacebook(e) {
        e.preventDefault();
        //-> //developers.facebook.com/docs/javascript/reference/v2.8

        FB.login(function(response) {
            
            console.log(response);

            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                var uid = response.authResponse.userID, 
                    accessToken = response.authResponse.accessToken, 
                    fields = ['id', 'first_name', 'last_name', 'link', 'gender', 'picture', 'email'];

                // Получили token и можно сделать запрос на сервер
                // Формируем url запроса -> url: 'https://graph.facebook.com/me?access_token=' + accessToken + '&fields=' + profileFields.join(',')

                FB.api('/me?fields=' + fields.join(','), function(response) {
                    console.log(response);
                });

            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                console.log('Please log ' + 'into this app.');
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                console.log('Please log ' + 'into Facebook.');
            }
        }, { scope: 'public_profile,email'});

        /*        
        FB.getLoginStatus(function(response) {
            console.log(response);
        }, true);        
        */
    },
    
    authGooglePlus(e) {},

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