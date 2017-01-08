import Marionette from 'backbone.marionette';
import Controller from './Controller.js';
import app from './app'
export default Marionette.AppRouter.extend({

    initialize(setts) {
        this.app = setts.app;
        this.controller = new Controller({app:this});
        this.listenTo(this.app.user,'logout',this.redirectIfLogout);
    },
    currentRoute:null,
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
        'Account/Login/:url':'login',
        'Account/FogotPassword':'fogotPassword',
        'account/register?returnUrl=:url':'registerUser',
        'account/register':'registerUser',
        'Home/HowItWorks':'howItWorks',
        'about-us':'about',
        'profile': 'myProfile',
        'messages/to/:remoteUserId?postId=:postId':'messagesTo',
        'messages/to/:remoteUserId':'messagesTo'
    },

    policy: {
        authorized:[
            'createPost',
            'postsMy',
            'chatId',
            'myProfile',
            'messagesTo'
        ]
    },

    onRoute(name, path, args) {
        this.currentRoute = name;
        if (_.contains(this.policy.authorized, name)) {
            if (!app.user.id) {
                this.navigate('Account/Login/'+encodeURIComponent(path), {trigger:true});
            }
        }
    },

    redirectIfLogout() {
        if (_.contains(this.policy.authorized, this.currentRoute)) {
            this.navigate('', {trigger:true});
        }
    }
});