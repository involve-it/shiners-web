import Marionette from 'backbone.marionette';
import IndexView from './index/indexView.js';
import PostDetailsView from './posts/DetailsView.js';
import AsteroidModel from '../data/AsteroidModel.js'
import PreloaderView from '../sharedViews/PreloaderView.js';
import CreatePostView from './posts/create/CreatePostView.js';
import LoginView from './account/LoginView.js';
import AboutView from './about/AboutView.js';
import HowItWorksView from './howItWorks/HowItWorksView.js';
import FogotPasswordView from './account/FogotPasswordView.js';
import app from './app.js';
import Model from '../data/AsteroidModel.js';
export default Marionette.Object.extend({

    initialize() {

    },

    index() {
        app.layout.showChildView('content', new IndexView());
    },

    postDetails(id) {
        app.layout.showChildView('content', new PreloaderView());
        var post = new AsteroidModel({_id:id},{asteroid:app.asteroid});
        post.loadByMethod('getPost',null,() => app.layout.showChildView('content', new PostDetailsView({model:post})));
    },
    createPost() {
        if (app.user.id) {
            app.layout.showChildView('content', new CreatePostView({model:new Model({userId:app.user.id}) }));
        } else {
            app.router.navigate('/', true);
        }       
    },

    login() {
        app.layout.showChildView('content',new LoginView({model:app.user}));
    },

    fogotPassword() {
        app.layout.showChildView('content',new FogotPasswordView());
    },

    about() {
        app.layout.showChildView('content',new AboutView());
    },

    howItWorks() {
        app.layout.showChildView('content',new HowItWorksView());
    }
});