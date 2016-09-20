import Marionette from 'backbone.marionette';
import IndexView from './index/indexView.js';
import PostDetailsView from './posts/DetailsView.js';
import AsteroidModel from '../data/AsteroidModel.js'
import PreloaderView from '../sharedViews/PreloaderView.js';
import app from './app.js';

export default Marionette.Object.extend({

    initialize() {

    },

    index() {
        app.layout.showChildView('content', new IndexView());
    },

    postDetails(id) {

        app.layout.showChildView('content', new PreloaderView());
        var post = new AsteroidModel({_id:id},{asteroid:app.asteroid});
        window.shinersPost = post;
        post.loadByMethod('getPost',{
            callback:() => app.layout.showChildView('content', new PostDetailsView({model:post}))
        });
    },
    createPost() {
        
    }
});