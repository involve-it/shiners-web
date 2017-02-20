import Marionette from 'backbone.marionette';
import template from './ProfileEditView.hbs.html';
import _ from 'underscore';
import app from '../app.js'


export default Marionette.View.extend({
    template: template,
    items: null,

    regions: {},

    events: {
        'blur #sh-profile-first-name, #sh-profile-last-name, #sh-profile-city, #sh-profile-phone, #sh-profile-skype, #sh-profile-vk, #sh-profile-facebook': 'profileAttributesChange',
        'click #sh-policy-1': 'openedPrivacy',
        'click #sh-policy-0': 'lockedPrivacy',
        'click #sh-profile-edit-action-save': 'profileEditSave'
    },

    modelEvents: {
        'save':'showSuccess',
    },

    initialize() {
        this.items = this.model.get('profileDetails') || {};
    },   

    onAttach() {
        Backbone.Validation.bind(this);
    },
       
    profileAttributesChange(e) {
        var target = e.target;

        if(target && target.id == 'sh-profile-first-name') {            
            this.fieldIteration('firstName', target);
        } else if(target && target.id == 'sh-profile-last-name') {
            this.fieldIteration('lastName', target);
        } else if(target && target.id == 'sh-profile-city') {
            this.fieldIteration('city', target);
        } else if(target && target.id == 'sh-profile-phone') {
            this.fieldIteration('phone', target);
        } else if(target && target.id == 'sh-profile-skype') {
            this.fieldIteration('skype', target);
        } else if(target && target.id == 'sh-profile-vk') {
            this.fieldIteration('vk', target);
        } else if(target && target.id == 'sh-profile-facebook') {
            this.fieldIteration('facebook', target);
        }

        this.model.set('profileDetails', this.items, {validate:true});
    },

    fieldIteration(name, el) {
        _.each(this.items, function(item) {
            if(item.key == name) {
                if((el.value && !_.isEmpty(el.value.trim()))) {
                    item.value = el.value.trim();
                } else {
                    item.value = '';
                }                
            }
        });
    },

    openedPrivacy(e) {
        var target = $(e.target),
            button = target.closest('.sh-profile-edit-privacy-control').find('.sh-privacy-dropdown');
            

        if(button) {
            var child = button.children();
           
            if(child.hasClass('fa-lock')) {
                child.removeClass('fa-lock');
                child.addClass('fa-unlock-alt');
            }
        }
                
        _.each(this.items, function(item) {
            if(item.key == 'phone') {
                item.policy = '1';
            }
        });

        this.model.set('profileDetails', this.items);
    },

    lockedPrivacy(e) {
        var target = $(e.target),
            button = target.closest('.sh-profile-edit-privacy-control').find('.sh-privacy-dropdown');

        if(button) {
            var child = button.children();
           
            if(child.hasClass('fa-unlock-alt')) {
                child.removeClass('fa-unlock-alt');
                child.addClass('fa-lock');
            }
        }

        _.each(this.items, function(item) {
            if(item.key == 'phone') {
                item.policy = '0';
            }
        });

        this.model.set('profileDetails', this.items);
    },

    profileEditSave(e) {
        this.model.save('editUser', {profileDetails: this.items});
    },

    showSuccess() {
        //-> Нужно сделать рендер для detailsView

        this.remove();
        this.trigger('destroy');
    }


});