import Marionette from 'backbone.marionette';
import Controller from './Controller.js';
export default Marionette.AppRouter.extend({
    initialize() {
        console.info('init router');
    },
    controller: new Controller,
    appRoutes: {
        "":"index",
        "posts/:id":"postDetails"

    }
});