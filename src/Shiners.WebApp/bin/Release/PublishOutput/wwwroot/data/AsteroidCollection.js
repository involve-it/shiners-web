import Backbone from 'backbone';
import _ from 'underscore';
import MongoModel from './MongoModel.js'
export default Backbone.Collection.extend({
    
    model:MongoModel,

    asteroid:null,

    initialize(models,options){      
        this.asteroid = options.asteroid||null;
        Backbone.Collection.prototype.initialize.apply(this,arguments);
    },

    loadByMethod(method,args,options) {
        var opts = options || {};
        var context = opts.context||this,
            callback = opts.callback ||null,
            self=this;
        this.trigger('before:load');
        this.asteroid.apply(method,args).result.then((result)=>{         
            if(callback)
                callback.apply(context,arguments);
            self.set(result,_.omit(opts,"context","callback"));
            self.trigger('after:load',result);
        });
    }
});