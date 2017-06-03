import  Backbone from 'backbone'

export default Backbone.Model.extend({

    labels: {
    },
    
    setLabels: function() {
        this.labels = {
            email : i18n.getI18nString('EMAIL_LABEL'),
            password : i18n.getI18nString('PASSWORD_LABEL'),
            confirmPassword : i18n.getI18nString('CONFIRM_PASSWORD_LABEL'),
            username : i18n.getI18nString('USERNAME_LABEL'),
        }
    },

    validation: {
        username: {
            required:true
        },

        password: {
            required:true
        },

        confirmPassword: {
            required:true,
            equalTo: 'password'
        },

        email: {
            required:true,
            pattern:'email'
        }
    }

});