import Backbone from 'backbone';
import _ from 'underscore';
import AsteroidModel from './AsteroidModel.js'
export default Backbone.Collection.extend({ 
    model:AsteroidModel,

    asteroid:null,
    subscriptions:null,
    initialize(models,options) {
        this.subscriptions = [];        
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
        this.asteroid.call(method, args).then((result)=> {
            var res = _.isArray(result) ? result : result.result;
            if (_.isArray(res)||result.success) {
                self.reset(res && !_.isEmpty(res)?res:null, _.omit(opts, "context", "callback"));
                if (callback)
                    callback.apply(context, arguments);
                self.trigger('after:load',self, result);
            } else {
                throw new Error(result.error?result.error.errorId:"error fetch asteroid collection by method "+method);
            }
        }).catch((error) => {
            throw new Error(error);
        });
    },

    sub() {
        var subscription = this.asteroid.subscribe.apply(this.asteroid,arguments);
        if (!_.find(sub => sub.id === subscription.id)) {
            this.subscriptions.push(subscription);
            var self = this;
            window.messagesSubscription = subscription; // debug
            subscription.ready.done(resp => {
                alert('publication' + resp);
                window.publicationResp = resp; // debug
                if (_.isArray(resp))
                    self.add(resp);
                else {
                    if (resp.success) {
                        self.add(resp.result);
                    } else {
                        throw new Error(resp.error?resp.error.errorId:"error publication asteroid collection by "+arguments[0]);
                    }
                }
            });
        }
        return subscription;
    },

    unsub() {
        _.each(this.subscriptions,(sub)=>sub.stop());
        this.subscriptions.length = 0;
    }
});