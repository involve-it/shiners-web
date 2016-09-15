import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Controller from './Controller.js'
export default Marionette.AppRouter.extend({
    
    controller:Controller,
    routes: {
        "":"index",
        "postDetails":"postDetails"

    }
});