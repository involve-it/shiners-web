import Backbone from 'backbone';
import _ from 'underscore';
export default Backbone.Model.extend({

    asteroid:null,

    initialize(attrs,options){      
        this.asteroid = options.asteroid||null;
        Backbone.Model.prototype.initialize.apply(this,arguments);
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
            self.set(_.isArray(result)?result[0]:result,_.omit(opts,"context","callback"));
            self.trigger('after:load',result);
        });
    }
});