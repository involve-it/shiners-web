import Marionette from 'backbone.marionette';
import template from './ProfileEditView.hbs.html'
import app from '../app.js'


export default Marionette.View.extend({
    template: template,

    events: {
        'click .sh-privacy-dropdown': 'privacyDropdown',
        'click #sh-profile-edit-action-save': 'profileEditSave'
    },

    initialize() {
        console.log('Model profile', this.model.toJSON());
    },


    privacyDropdown(e) {
        e.preventDefault();
        console.log('click privacyDropdown');
    },

    profileEditSave(e) {
        e.preventDefault();
        console.log('click profileEditSave');
    }


});