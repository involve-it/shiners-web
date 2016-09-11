
import Backbone from 'backbone';
import Asteroid from 'asteroid.browser';
import RootView from './MainLayoutView.js';
import Collection from '../data/AsteroidCollection'
let App = Backbone.Marionette.Application.extend({
    region:'body',
    asteroid:null,
    onStart() {
        this.asteroid = new Asteroid("www.shiners.mobi",true);
        var collection = new Collection(null,{asteroid:this.asteroid});
        this.showView(new RootView({collection:collection}));
        
        var asteroid = this.asteroid;
        //asteroid.loginWithPassword('megafetis@gmail.com', 'ferromon').then((result)=> {
        //    window.authResult = result;
        //    asteroid.call('getMyPosts',0,10).result.then((resp) => {
        //        window.getMyPosts = resp;
        //    }).catch((err)=>{alert(err)});
        //}).catch((error) => {
        //    alert('Error:'+ error); 
        //});
    }
});

export default new App();