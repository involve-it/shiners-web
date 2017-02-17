import Marionette from 'backbone.marionette';
import template from './ProfileEditView.hbs.html'
import app from '../app.js'


export default Marionette.View.extend({
    template: template,

    regions: {},

    events: {
        'click .sh-privacy-dropdown': 'privacyPrivacy',
        'click #sh-policy-1': 'openedPrivacy',
        'click #sh-policy-0': 'lockedPrivacy',
        'click #sh-profile-edit-action-save': 'profileEditSave'
    },

    modelEvents: {
        'save':'showSuccess',
    },

    initialize() {
        console.log('Model profile', this.model.toJSON());
    },

    openedPrivacy(e) {
        var target = $(e.target);
        if(target && target.data('target') === 'opened') {
            var el = target.closest('.sh-profile-edit-privacy-control'),
                icon = el.find('.sh-privacy-dropdown').children();

            if(icon.hasClass('fa-unlock-alt')) {
                icon.removeClass('fa-unlock-alt');
                icon.addClass('fa-lock');
            }
        }
        console.log('opened policy', target.data('target'));
    },

    lockedPrivacy(e) {},

    privacyDropdown(e) {
        e.preventDefault();
        var target = e.target.closest('.sh-profile-edit-privacy-control');

        console.log('click privacyDropdown', target);
    },

    profileEditSave(e) {
        e.preventDefault();
        console.log('click profileEditSave');
    },

    showSuccess() {}


});