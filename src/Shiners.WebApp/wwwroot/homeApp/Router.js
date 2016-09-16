import Marionette from 'backbone.marionette';
import Controller from './Controller.js'
export default Marionette.AppRouter.extend({
    
    controller:new Controller,
    appRoutes: {
        "":"index",
        "posts/new":"createPost",
        "posts/:id":"postDetails"
    }
});