import app from './app.js';

var controller = {
    index() {
        var View = require('./index/indexView.js');
        app.layout.showChildView('content', new View({collection:app.nearbyPosts}));
    },

    postDetails(id) {
        
    }
};

export default controller;