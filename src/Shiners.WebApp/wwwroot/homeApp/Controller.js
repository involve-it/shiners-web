import app from './app.js';
var IndexView = require('./index/indexView.js');
import PostDetailsView from './posts/DetailsView.js';
import Marionette from 'backbone.marionette';



export default Marionette.Object.extend({
    index() {
        
        app.layout.showChildView('content', new IndexView({collection:app.nearbyPosts}));
    },

    postDetails(id) {
        app.layout.showChildView('content', new PostDetailsView({model:app.nearbyPosts}));
    },
    createPost() {
        
    }
});