import app from './app.js';
var IndexView = require('./index/indexView.js');
import PostDetailsView from './posts/DetailsView.js';
import Marionette from 'backbone.marionette';
import AsteroidModel from '../data/AsteroidModel.js'


export default Marionette.Object.extend({
    index() {
        
        app.layout.showChildView('content', new IndexView({collection:app.nearbyPosts}));
    },

    postDetails(id) {
        var post = new AsteroidModel({_id:id});
        post.loadByMethod('getPost',{callback:() => {
            app.layout.showChildView('content', new PostDetailsView({model:post}));
        }});
    },
    createPost() {
        
    }
});