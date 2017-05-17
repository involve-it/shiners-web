import  Backbone from 'backbone'
export default Backbone.Model.extend({

    labels: {
    },
    
    setLabels: function() {
        this.labels = {
            email : i18n.getI18nString('EMAIL_LABEL'),
            password : i18n.getI18nString('PASSWORD_LABEL'),
        }
    },

    validation: {
        email: {
            required:true
        },

        password: {
            required:true
        }
    }

});