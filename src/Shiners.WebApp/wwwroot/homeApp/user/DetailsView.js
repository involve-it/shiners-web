import Marionette from 'backbone.marionette';
import AsteroidModel from '../../data/AsteroidModel.js';
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

        this.sendMessageModel = new AsteroidModel({
            name: this.r_user.username,
            user_id: app.user.get('_id'),
            remoteUser_id: this.r_user._id
        }, {asteroid: app.asteroid});

        this.profileEditModel = new AsteroidModel(
            this.c_user, {asteroid: app.asteroid});

        this.listenTo(this.profileEditModel, 'save', this.renderr);
    },

    renderr() {
        console.log('Профиль rrrrrr');
        ///this.render();
    },

    onBeforeRender() {
        this.templateContext = {
            user: app.user.toJSON()
        }
    },

    onRender() {
        //this.showChildView('content', new UserDetailsView({model: this.profileEditModel}))
        console.log('Профиль отреднерился');
    },

    logout() {
        app.logout();
    },

    profileSend(e) {
        //Необходима проверка -> залогинен или нет, иначе отправлять на регистрацию
        this.showChildView('modal', new ModalView({view:new SendMessageView({model: this.sendMessageModel}), title:'Сообщение для пользователя'}));
    },

    profileEdit(e) {
        this.showChildView('modal', new ModalView({view:new ProfileEditView({model: this.profileEditModel}), title:'Настройки профиля'}));
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