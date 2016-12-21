import Marionette from 'backbone.marionette';
import Controller from './Controller.js';

export default Marionette.AppRouter.extend({

    initialize(setts) {
        this.app = setts.app;
        this.controller = new Controller({app:this});
    },

    appRoutes: {
        '':'index',
        'mobileIndex':'mobileIndex',
        'posts/new':'createPost',
        //'Posts/new':'createPost',
        //'Posts/New':'createPost',
        'posts/my':'postsMy',
        'chats/my':'myMessagesPage',
        //'chats/my':'chatsMy',
        'chats/:id':'chatId',
        'posts/:id':'postDetails',
        'user/:id': 'userDetails',
        'Account/Login':'login',
        'Account/FogotPassword':'fogotPassword',
        'Home/HowItWorks':'howItWorks',
        'about-us':'about',
        'profile': 'myProfile',
        'messages/to/:remoteUserId?postId=:postId':'messagesTo',
        'messages/to/:remoteUserId':'messagesTo'
    }
});