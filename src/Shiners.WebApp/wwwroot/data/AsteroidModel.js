import _ from 'underscore';
import MongoModel from './MongoModel.js';
export default MongoModel.extend({

    asteroid:null,

    initialize(attrs,options){      
        this.asteroid = (options||{}).asteroid||null;
        MongoModel.prototype.initialize.apply(this,arguments);
    },

    loadByMethod(method,args,callbk,options) {
        if (!this.asteroid)
            throw new Error("Asteroid instanse of model with id="+this.id+" is not exists!");
        var opts = options || (callbk&&!_.isFunction(callbk)?callbk:{});
        var context = opts.context||this,
            callback = callbk ||(_.isFunction(args)?args:null),
            self=this,
            argums=!args || _.isFunction(args)?[this.id]:args;
        this.trigger('before:load');
        this.asteroid.apply(method,argums).result.then((result)=> {
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