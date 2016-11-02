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

    loadByMethod(method,args,callbk,options) {
        if (!this.asteroid)
            throw new Error("Asteroid instanse of this collection is not exists!");
        var opts = options || {};
        var context = opts.context||this,
            callback = callbk ||null,
            self = this;
        this.trigger('before:load',this);
        this.asteroid.call(method, args).result.then((result)=> {
            var res = _.isArray(result) ? result : result.result;
            if (result.success) {
                self.reset(!res || _.isEmpty(res)?null:res, _.omit(opts, "context", "callback"));
                if (callback)
                    callback.apply(context, arguments);
                self.trigger('after:load',self, result);
            } else {
                throw new Error(result.error?result.error.errorId:"error fetch asteroid collection by method "+method);
            }
        }).catch((error) => {
            console.error(error);
            throw new Error(error);
        });
    }
});