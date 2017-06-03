import _ from 'underscore';
import MongoModel from './MongoModel.js';
export default MongoModel.extend({

    asteroid:null,

    initialize(attrs,options) {
        this.asteroid = options && options.asteroid
            ? options.asteroid
            : (this.collection && this.collection.asteroid ? this.collection.asteroid : null);
        MongoModel.prototype.initialize.apply(this,arguments);
    },

    loadByMethod(method,args,callbk,options) {
        if (!this.asteroid)
            throw new Error("Asteroid instanse of model with id="+this.id+" is not exists!");
        var opts = options || (callbk&&!_.isFunction(callbk)?callbk:{});
        var context = opts.context||this,
            callback = callbk ||(_.isFunction(args)?args:null),
            self=this,
            argums=!args || _.isFunction(args)?[this.id]:(_.isArray(args)?args:[args]);
        this.trigger('before:load');
        return this.asteroid.apply(method,argums).then((result)=> {
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
    },

    save(method,args,callbk,options) {
        if (!this.asteroid)
            throw new Error("Asteroid instanse of model with id="+this.id+" is not exists!");
        var opts = options || (callbk&&!_.isFunction(callbk)?callbk:{});
        var context = opts.context||this,
            callback = callbk ||(_.isFunction(args)?args:null),
            self=this,
            argums=!args || _.isFunction(args)?[this.attributes]:(_.isArray(args)?args:[args]);
        this.trigger('before:save');
        return this.asteroid.apply(method,argums).then((id)=> {
            self.set('_id',id, _.omit(opts, "context", "callback"));
            if (callback)
                callback.apply(context, arguments);
            self.trigger('save', id);    
        }).catch(err => {
            self.trigger('error:save', id);
            throw new Error("Save fail from meteor! Custom error: " + err);
        });
    },

    remove(method,args,callbk,options) {
        if (!this.asteroid)
            throw new Error("Asteroid instanse of model with id="+this.id+" is not exists!");
        var opts = options || (callbk&&!_.isFunction(callbk)?callbk:{});
        var context = opts.context||this,
            callback = callbk ||(_.isFunction(args)?args:null),
            self=this,
            argums=!args || _.isFunction(args)?[this.attributes]:(_.isArray(args)?args:[args]);
        this.trigger('before:destroy');
        return this.asteroid.apply(method,argums).then(result=> {
            if (result.success) {
                self.unset('_id', _.omit(opts, "context", "callback"));
                if (callback)
                    callback.apply(context, arguments);
                self.trigger('destroy', result);
            } else {
                self.trigger('error:destroy', result);
            }           
        }).catch(err => {
            self.trigger('error:destroy', result);
            throw new Error("Destroy fail from meteor! Custom error: " + err);
        });
    }
});