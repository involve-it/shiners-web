import Model from '../AsteroidModel.js'
import Backbone from 'backbone'
export default Model.extend({ 
    schema: {
        photos: Backbone.Collection,
        locations:Backbone.Collection
    }
});