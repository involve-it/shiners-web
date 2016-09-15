import Backbone from 'backbone';
import Asteroid from 'asteroid.browser';
import RootView from './MainLayoutView.js';
import Collection from '../data/AsteroidCollection'
let App = Backbone.Marionette.Application.extend({
    region:'body',
    layout:null,
    asteroid:null,
    onStart() {
        this.asteroid = new Asteroid("www.shiners.mobi",true);
        var collection = new Collection(null,{asteroid:this.asteroid});
        var rootView = new RootView({ collection: collection });
        this.layout = rootView;
        this.showView(rootView);
    }
});

export default new App();