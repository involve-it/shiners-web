import app from './app.js';
import IndexView from './index/IndexView.js';
import Marionette from 'backbone.marionette';
import AsteroidModel from '../data/AsteroidModel.js';
export default Marionette.Object.extend({
    initialize: function(){
        console.info('init controller');
    },
    index() {
        console.info('index route');
        app.layout.showChildView('content', new IndexView({collection:app.nearbyPosts}));
    },

    postDetails(id) {
        var post = new AsteroidModel({ _id: id });
        app.layout.showChildView('content', new DetailsView({model:post}));
    }
});