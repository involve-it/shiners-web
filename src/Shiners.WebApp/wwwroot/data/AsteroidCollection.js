import Backbone from 'backbone';
import _ from 'underscore';
export default Backbone.Collection.extend({
    
    asteroid:null,

    initialize(models,options){      
        this.asteroid = options.asteroid||null;
        Backbone.Collection.prototype.initialize.apply(this,arguments);
    },

    loadByMethod(method,args,callback,context,options){
        context=context||this;
        var self=this;
        this.trigger('before:load');
        this.asteroid.apply(method,args).then((result)=>{
            callback.apply(context,arguments);
            self.set(result,options);
            self.trigger('after:load',result);
        });
    }
});