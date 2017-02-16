import Marionette from 'backbone.marionette';
import IndexView from './index/indexView.js';
import MobileIndexView from './index/MobileIndexView.js';
import PostDetailsView from './posts/DetailsView.js';
import AsteroidModel from '../data/AsteroidModel.js';
import AsteroidCollection from '../data/AsteroidCollection.js';
import UserModel from '../data/Domain/User.js';
import Post from '../data/Post/PostModel.js'
//import Collection from '../data/AsteroidCollection.js';
import PreloaderView from '../sharedViews/PreloaderView.js';
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

import LegalUserAgreementView from './legal/legalUserAgreementView';
import LegalConfidentialView from './legal/legalConfidentialView';
import LegalPostPublishingView from './legal/legalPostPublishingView';

import BlogHomeView from './blog/blogHomeView';
import BlogPostIdView from './blog/blogPostIdView';
//import ProfilePageView from './user/ProfilePageView';
//import MyMessagesPageView from './user/MyMessagesPageView';
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
        app.layout.showChildView('content', new MobileIndexView({IndexView: IndexView}));
    },

    postsMy(){
        app.myPosts.loadByMethod('getMyPosts', {skip: 0, take: 100, type: 'all'}, () => {
            app.layout.showChildView('content', new PostsMytView({collection: app.myPosts}));
        });
    },

    postDetails(id) {
        app.layout.showChildView('content', new PreloaderView());
        var post = new AsteroidModel({_id: id}, {asteroid: app.asteroid});
        post.loadByMethod('getPost', null, () => {
            //window.detailsPost = post; // debug
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
        app.layout.showChildView('content', new AboutView());
    },

    massMedia() {
        app.layout.showChildView('content', new MassMediaView());
    },

    howItWorks() {
        app.layout.showChildView('content', new HowItWorksView());
    },

    chatsMy(){
        app.myChats.loadByMethod('getChats', {skip: 0, take: 100}, (res) => {
            app.layout.showChildView('content', new ChatsMyView({collection: app.myChats}));
        });
    },

    chatId(chatId, remoteUserId){
        //app.layout.showChildView('content', new PreloaderView());
        //var chatModel = new Backbone.Model({ _id:id });
        //app.layout.showChildView('content', new ChatIdView( {model: chatModel } ));
        app.layout.showChildView('content', new PreloaderView());
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
        app.layout.showChildView('content', new PreloaderView());
        if (app.asteroid.loggedIn) {
            var remoteUser = new AsteroidModel({_id: remoteUserId}, {asteroid: app.asteroid});
            app.asteroid.call('bz.chats.createChatIfFirstMessage', app.user.id, remoteUserId).result.then((chatId) => {
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

    //myMessagesPage() {
    //    app.layout.showChildView('content',new MyMessagesPageView());
    //},

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
        /*debugger;
        var ceres = app.asteroid;
        ceres.subscribe("blog.posts");
        var blogPosts = ceres.getCollection("blog_posts");
        window.bp = blogPosts;
        //tasks.insert({
        //    description: "Do the laundry"
        //});
// Get the task
        var laundryTaskRQ = blogPosts.reactiveQuery({ mode: 'public' });
// Log the array of results
        console.log(laundryTaskRQ.result);
// Listen for changes
        laundryTaskRQ.on("change", function () {
            debugger;
            console.log(laundryTaskRQ.result);
        });*/
        //debugger;
        var subscription = app.asteroid.subscribe('blog.posts');
        subscription.ready.done(function(a, b, c) {
            console.log('ready - posts')
        });
        var a = new AsteroidCollection(null, { asteroid: app.asteroid });
        //debugger;
        /*a.sub('blog.authors');
        var s = a.subscriptions[0];
        s.ready.done(function() {
            console.log('ready - authors')
        });*/
        
        
       // var c = app.asteroid.getCollection('blog_posts').find().fetch();
        //console.log(c)
        app.layout.showChildView('content', new BlogHomeView());
        
        
        /*var c = new AsteroidCollection(null, { asteroid: app.asteroid });
        c.loadByMethod('getBlogPosts', () => {
            debugger;
            app.layout.showChildView('content', new BlogHomeView({collection: c}));
        });*/
    },

    blogPostId(id) {
        console.log('ID: ', id); //debug
        app.layout.showChildView('content', new PreloaderView());
        app.layout.showChildView('content', new BlogPostIdView());
    }
});