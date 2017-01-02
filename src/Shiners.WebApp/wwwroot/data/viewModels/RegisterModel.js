import  Backbone from 'backbone'

export default Backbone.Model.extend({

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