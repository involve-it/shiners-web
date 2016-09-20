import _ from 'underscore';
import MongoModel from './MongoModel.js';
export default MongoModel.extend({

    asteroid:null,

    initialize(attrs,options){      
        this.asteroid = (options||{}).asteroid||null;
        MongoModel.prototype.initialize.apply(this,arguments);
    },

    loadByMethod(method,options) {
        if (!this.asteroid)
            throw new Error("Asteroid instanse of model with id="+this.id+" is not exists!");
        var opts = options || {};
        var context = opts.context||this,
            callback = opts.callback ||null,
            self=this;
        this.trigger('before:load');
        this.asteroid.apply(method,opts.args||[this.id]).result.then((result)=>{ 
            if (result && result.success) {
                self.set(result.result, _.omit(opts, "context", "callback"));
                if (callback)
                    callback.apply(context, arguments);
                self.trigger('after:load', result);
            } else if(result.error) {
                throw new Error("Fetch fail from meteor! Error Id: " + result.error.errorId);
            }          
        }).catch(err => {
            throw new Error("Fetch fail from meteor! Custom access error: " + err);
        });
    }
});