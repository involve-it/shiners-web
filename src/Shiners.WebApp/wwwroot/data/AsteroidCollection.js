import Backbone from 'backbone';
import _ from 'underscore';
import AsteroidModel from './AsteroidModel.js'
export default Backbone.Collection.extend({
    
    model:AsteroidModel,

    asteroid:null,

    initialize(models,options){      
        this.asteroid = (options||{}).asteroid||null;
        Backbone.Collection.prototype.initialize.apply(this,arguments);
    },

    loadByMethod(method,args,options) {
        if (!this.asteroid)
            throw new Error("Asteroid instanse of this collection is not exists!");
        var opts = options || {};
        var context = opts.context||this,
            callback = opts.callback ||null,
            self=this;
        this.trigger('before:load');
        var result = this.asteroid.apply(method, args).result;
        result.then((result)=>{  
            self.set(result,_.omit(opts,"context","callback"));
            if(callback)
                callback.apply(context,arguments);           
            self.trigger('after:load',result);
        });
        return this.asteroid.apply(method, args).result;
    }
});