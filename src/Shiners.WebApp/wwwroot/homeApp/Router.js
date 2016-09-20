import Marionette from 'backbone.marionette';
import Controller from './Controller.js';

export default Marionette.AppRouter.extend({

    initialize(setts) {
        this.app = setts.app;
        this.controller = new Controller({app:this});
    },

    appRoutes: {
        "":"index",
        "posts/new":"createPost",
        "posts/:id":"postDetails",
        "Posts/new":"createPost",
        "Posts/:id":"postDetails"
    }
});