import app from './app.js';
import IndexView from './index/indexView.js';
import PostDetailsView from './posts/DetailsView.js';
import Marionette from 'backbone.marionette';
import AsteroidModel from '../data/AsteroidModel.js'


export default Marionette.Object.extend({
    index() {
        app.layout.showChildView('content', new IndexView({collection:app.nearbyPosts}));
    },

    postDetails(id) {
        console.info('post details route starting');
        var post = new AsteroidModel({_id:id},{asteroid:app.asteroid});
        post.loadByMethod('getPost',{
            callback:() => app.layout.showChildView('content', new PostDetailsView({model:post}))
        });
        console.info('post details route started');
    },
    createPost() {
        
    }
});