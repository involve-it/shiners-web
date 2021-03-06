﻿import Marionette from 'backbone.marionette';
import IndexView from './index/indexView.js';
import MobileIndexView from './index/MobileIndexView.js';
import PostDetailsView from './posts/DetailsView.js';
import AsteroidModel from '../data/AsteroidModel.js';
import AsteroidCollection from '../data/AsteroidCollection.js';
import UserModel from '../data/Domain/User.js';
import Post from '../data/Post/PostModel.js'
//import Collection from '../data/AsteroidCollection.js';
import PreloaderView from '../sharedViews/PreloaderView.js';
import PreloaderInnerView from '../sharedViews/PreloaderInnerView.js';
import CreatePostView from './posts/create/CreatePostView.js';

import PostsMytView from './posts/postsMy/PostsMyView.js';
import ChatsMyView from './chats/chatsMy/chatsMyView.js';
import ChatIdView from './chats/ChatIdView.js';
import UserDetailsView from './user/DetailsView.js';
import MessagesToUserView from './chats/native/MessagesToUserView.js';

import LoginView from './account/LoginView.js';
import RegisterUserView from './account/RegisterUserView'
import AboutView from './about/AboutView.js';
import MassMediaView from './massMedia/MassMediaView.js';
import HowItWorksView from './howItWorks/HowItWorksView.js';
import FogotPasswordView from './account/FogotPasswordView.js';
import RedirectPage from './redirectPage/redirectPage.js';


import LegalUserAgreementView from './legal/legalUserAgreementView';
import LegalConfidentialView from './legal/legalConfidentialView';
import LegalPostPublishingView from './legal/legalPostPublishingView';

import EmptyBlogHomeView from './blog/emptyBlogHomeView';
import BlogHomeView from './blog/blogHomeView';
import BlogPostIdView from './blog/blogPostIdView';
//import ProfilePageView from './user/ProfilePageView';
//import MyMessagesPageView from './user/MyMessagesPageView';
//import UserDetailsPageView from './user/UserDetailsPageView';
import app from './app.js';
export default Marionette.Object.extend({

    index() {
        app.layout.showChildView('content', new IndexView());
    },

    mobileIndex() {
        app.layout.showChildView('content', new MobileIndexView({IndexView: IndexView}));
    },

    postsMy(){
        app.layout.showChildView('content', new PreloaderInnerView());
        app.myPosts.loadByMethod('getMyPosts', {skip: 0, take: 100, type: 'all'}, () => {
            app.layout.showChildView('content', new PostsMytView({collection: app.myPosts}));
        });
    },

    appRedirect() {
        app.layout.showChildView('content', new RedirectPage());
    },

    postDetails(id) {
        app.layout.showChildView('content', new PreloaderView());
        var post = new AsteroidModel({_id: id}, {asteroid: app.asteroid});
        post.loadByMethod('getPost', null, () => {
            app.layout.showChildView('content', new PostDetailsView({model: post}));
        });
    },

    createPost() {
        var model = new Post({details: {}, stats: {seenToday: 0, seenTotal: 0, seenAll: 0}}, {asteroid: app.asteroid});
        app.layout.showChildView('content', new CreatePostView({model: model}));
    },

    editPost(id) {
        var post = new Post({_id: id});
        post.isOwnerAsync(app.user.id).done(resp => {
            if (resp) {
                alert(resp);
            }
        });
    },

    login(url) {
        app.layout.showChildView('content', new LoginView({returnUrl: url || null}));
    },

    registerUser(url) {
        app.layout.showChildView('content', new RegisterUserView({returnUrl: url || null}));
    },

    fogotPassword() {
        app.layout.showChildView('content', new FogotPasswordView());
    },

    about() {
        app.layout.showChildView('content', new PreloaderInnerView());
        app.layout.showChildView('content', new AboutView());
    },

    massMedia() {
        app.layout.showChildView('content', new PreloaderInnerView());
        app.layout.showChildView('content', new MassMediaView());
    },

    howItWorks() {
        app.layout.showChildView('content', new HowItWorksView());
    },

    chatsMy(){
        app.layout.showChildView('content', new PreloaderInnerView());
        app.myChats.loadByMethod('getChats', {skip: 0, take: 100}, (res) => {
            app.layout.showChildView('content', new ChatsMyView({collection: app.myChats}));
        });
    },

    chatId(chatId, remoteUserId){
        //app.layout.showChildView('content', new PreloaderView());
        //var chatModel = new Backbone.Model({ _id:id });
        //app.layout.showChildView('content', new ChatIdView( {model: chatModel } ));
        app.layout.showChildView('content', new PreloaderInnerView());
        var messages = new AsteroidCollection(null, {asteroid: app.asteroid, comparator: 'timestamp'});
        var remoteUser = new AsteroidModel({_id: remoteUserId}, {asteroid: app.asteroid});
        messages.loadByMethod('getMessages', {chatId: chatId, skip: 0, take: 20}, () => {
            remoteUser.loadByMethod('getUser', () => {
                var chat = new AsteroidModel({
                    _id: chatId,
                    remoteUser: remoteUser.toJSON(),
                    user: app.user.toJSON()/*,postId:postId*/
                }, {asteroid: app.asteroid});
                app.layout.showChildView('content', new MessagesToUserView({model: chat, collection: messages}));
            });
        });
    },

    messagesTo(remoteUserId, postId) {
        app.layout.showChildView('content', new PreloaderInnerView());
        if (app.asteroid.loggedIn) {
            var remoteUser = new AsteroidModel({_id: remoteUserId}, {asteroid: app.asteroid});
            app.asteroid.call('bz.chats.createChatIfFirstMessage', app.user.id, remoteUserId).then((chatId) => {
                app.router.navigate(`/chats/${ chatId }?remoteUserId=${ remoteUserId }`, { trigger: true, replace: true });
            });
        } else {
            app.router.navigate('', {trigger: true});
        }
    },

    myProfile(){
        app.layout.showChildView('content', new PreloaderView());
         
        var userModel = new UserModel({_id: app.user.get('_id')});
       // window.currentUser = userModel;
        userModel.fetch().done(() => app.layout.showChildView('content', new UserDetailsView({model: userModel})));
    },

    userDetails(id) {
        app.layout.showChildView('content', new PreloaderView());
        var userModel = new UserModel({_id: id});
        window.currentUser = userModel;
        userModel.fetch().done(() => app.layout.showChildView('content', new UserDetailsView({model: userModel})));
    },

    // LEGAL:
    legalConfidential() {
        app.layout.showChildView('content', new LegalConfidentialView());
    },
    legalUserAgreement() {
        app.layout.showChildView('content', new LegalUserAgreementView());
    },
    legalPostPublishingRules() {
        app.layout.showChildView('content', new LegalPostPublishingView());
    },

    // BLOG:
    blogHome() {
        app.layout.showChildView('content', new PreloaderInnerView());
        var posts = new AsteroidCollection(null, {
            asteroid: app.asteroid,            
            comparator: function(a, b) {
                var a = a.get("createdAt").$date;
                var b = b.get("createdAt").$date;                
                if (a == b) return 0;
                return a < b ? 1 : -1;
            }
        });

        //app.layout.showChildView('content', new BlogHomeView({ collection: [] }));
        posts.loadByMethod('bz.blog.getPosts', null, () => {
            (posts.length === 0) ? app.layout.showChildView('content', new EmptyBlogHomeView({})) : app.layout.showChildView('content', new BlogHomeView({ collection: posts }));
        });
    },

    blogPostId(id) {
        app.layout.showChildView('content', new PreloaderInnerView());
        if (id) {
            app.asteroid.call('bz.blog.getPostById', id).then((post) => {
                app.layout.showChildView('content', new BlogPostIdView({ model: post }));
            });
        }
    }
    
});