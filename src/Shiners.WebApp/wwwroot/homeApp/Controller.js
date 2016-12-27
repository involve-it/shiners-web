﻿import Marionette from 'backbone.marionette';
import IndexView from './index/indexView.js';
import MobileIndexView from './index/MobileIndexView.js';
import PostDetailsView from './posts/DetailsView.js';
import AsteroidModel from '../data/AsteroidModel.js';
import UserModel from '../data/Domain/User.js';
import Post from '../data/Post/PostModel.js'
import Collection from '../data/AsteroidCollection.js';
import PreloaderView from '../sharedViews/PreloaderView.js';
import CreatePostView from './posts/create/CreatePostView.js';

import PostsMytView from './posts/postsMy/PostsMyView.js';
import ChatsMyView from './chats/ChatsMyView.js';
import ChatIdView from './chats/ChatIdView.js';
import UserDetailsView from './user/DetailsView.js';
import MessagesToUserView from './chats/native/MessagesToUserView.js';

import LoginView from './account/LoginView.js';
import AboutView from './about/AboutView.js';
import HowItWorksView from './howItWorks/HowItWorksView.js';
import FogotPasswordView from './account/FogotPasswordView.js';
//import ProfilePageView from './user/ProfilePageView';
import MyMessagesPageView from './user/MyMessagesPageView';
//import UserDetailsPageView from './user/UserDetailsPageView';
import app from './app.js';

export default Marionette.Object.extend({

    index() {
        if (!app.isMobile)
            app.layout.showChildView('content', new IndexView());
        else {
            app.layout.getRegion('content').empty();
        }
    },

    mobileIndex() {
        app.layout.showChildView('content', new MobileIndexView({IndexView:IndexView}));
    },

    postsMy(){
        app.layout.showChildView('content',new PostsMytView());
    },
    
    postDetails(id) {
        app.layout.showChildView('content', new PreloaderView());
        var post = new AsteroidModel({_id:id},{asteroid:app.asteroid});
        post.loadByMethod('getPost',null,() => {
            window.detailsPost = post; // debug
            app.layout.showChildView('content', new PostDetailsView({ model: post }));
        });
    },

    createPost() {
       if (app.user.id) {
                var model = new Post({details:{}},{asteroid:app.asteroid});
                app.layout.showChildView('content', new CreatePostView({model:model}));
          } else {
              app.router.navigate('/', true);
          }
    },

    login(url) {
        app.layout.showChildView('content',new LoginView({model:app.user,returnUrl:url||null}));
    },

    fogotPassword() {
        app.layout.showChildView('content',new FogotPasswordView());
    },

    about() {
        app.layout.showChildView('content',new AboutView());
    },

    howItWorks() {
        app.layout.showChildView('content',new HowItWorksView());
    },

    chatsMy(){
        app.layout.showChildView('content',new ChatsMyView());
    },

    chatId(id){
        app.layout.showChildView('content', new PreloaderView());
        var chatModel = new Backbone.Model({ _id:id });
        app.layout.showChildView('content', new ChatIdView( {model: chatModel } ));
    },

    messagesTo(remoteUserId,postId) {
        app.layout.showChildView('content', new PreloaderView());
        if (app.asteroid.loggedIn) {
            var remoteUser = new AsteroidModel({ _id: remoteUserId }, { asteroid: app.asteroid });
            remoteUser.loadByMethod('getUser',() => {
                window.remoteUser = remoteUser; // debug
                app.asteroid.call('bz.chats.createChatIfFirstMessage',app.user.id, remoteUserId).result.then((chatId) => {
                    var messages = new Collection(null,{asteroid:app.asteroid,comparator:'timestamp'});
                    messages.loadByMethod('getMessages', {chatId:chatId,skip:0,take:20},() => {
                        var chat = new AsteroidModel({_id:chatId,remoteUser:remoteUser.toJSON(),user:app.user.toJSON(),postId:postId}, { asteroid: app.asteroid });
                        app.layout.showChildView('content', new MessagesToUserView({ model: chat,collection:messages }));
                    });
                });
            });
        } else {
            app.router.navigate("",{trigger:true});
        }        
    },

    myProfile(){
        
    },

    myMessagesPage() {
        app.layout.showChildView('content',new MyMessagesPageView());
    },

    userDetails(id) {
        app.layout.showChildView('content', new PreloaderView());
        var userModel = new UserModel({ _id:id });
        window.currentUser = userModel;
        userModel.fetch().done(() => app.layout.showChildView('content', new UserDetailsView({ model: userModel })));
    }
});