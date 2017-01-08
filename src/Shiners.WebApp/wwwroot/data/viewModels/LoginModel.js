import  Backbone from 'backbone'

export default Backbone.Model.extend({

    validation: {
        email: {
            required:true
        },

        password: {
            required:true
        }
    }

});