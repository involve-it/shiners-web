import Marionette from 'backbone.marionette';
import template from './DetailsView.hbs.html';
import SendMessageView from './SendMessageView.js';
import ProfileEditView from './ProfileEditView.js';
import _ from 'underscore';
import ModalView from '../../sharedViews/ModalContainerView.js'
import app from '../app.js';

var View = Marionette.View.extend({
    template:template,
    tagName:'div',
    className:'sh-user-profile',
    c_user: null,
    r_user: null,

    events: {
        'click #logout' : 'logout',
        'click #profile-send' : 'profileSend',
        'click #profile-edit' : 'profileEdit',
        'click #checkPosts' : 'checkPosts',
        'click #profile-link' : 'directProfileLink'
    },

    regions: {
        'modal':'#modalContainer'
    },

    initialize() {
        this.r_user = this.model.toJSON();
        this.c_user = app.user.toJSON();

        this.sendMessageModel = new Backbone.Model({
            name: this.r_user.username,
            user_id: this.c_user._id,
            remoteUser_id: this.r_user._id,
            chatId: this.model.id
        });
    },

    onBeforeRender() {
        this.templateContext = {
            user: app.user.toJSON()
        }
    },

    onRender() {
        window.userLogin = this.model.toJSON();           //debug
        window.userCurrent = this.templateContext.user;   //debug
    },

    logout() {
        app.logout();
    },

    profileSend(e) {
        //Необходима проверка -> залогинен или нет, иначе отправлять на регистрацию
        this.showChildView('modal', new ModalView({view:new SendMessageView({model:this.sendMessageModel}), title:'Сообщение для пользователя'}));
    },

    profileEdit(e) {
        this.showChildView('modal', new ModalView({view:new ProfileEditView({model:new Backbone.Model(this.c_user)}), title:'Настройки профиля'}));
    },

    checkPosts(e) {
        var checkbox = $(e.target),
            toggle;

        toggle = checkbox.prop('checked');
        // -> method to update profile field
    },
    
    directProfileLink(e) {
        var t = e.target.closest('#profile-link'),
            c = t.dataset.copytarget,
            inp = (c ? document.querySelector(c) : null);

        if(inp && inp.select) {
            inp.select();
            
            try {
                document.execCommand('copy');
                setTimeout(function() {
                    inp.blur();
                }, 250);
            }
            catch (err) {
                console.warn('please press Ctrl/Cmd+C to copy');
            }
        }
    }
});

export default View;