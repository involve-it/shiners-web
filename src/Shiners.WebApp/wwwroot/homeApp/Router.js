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
        "Posts/new":"createPost",
        "Posts/My":"postsMy",
        "chats/My":"chatsMy",
        "Chats/My":"chatsMy",
        "posts/:id":"postDetails",
        "chats/:id":"chatId",
        "Chats/:id":"chatId",
        "user/:id": "profileDetails",
        "Account/Login":"login",
        "Account/FogotPassword":"fogotPassword",
        "Home/About":"about",
        "Home/HowItWorks":'howItWorks'
    }
});