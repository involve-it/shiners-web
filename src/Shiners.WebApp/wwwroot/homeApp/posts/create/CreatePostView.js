import Marionette from 'backbone.marionette';
import template from './CreatePostView.hbs.html';
import app from '../../app.js';

var View = Marionette.View.extend({
    template:template,
    tagName:'section',
    events: {
        'click #back':'back',
        'change inpot[type=text]':'setProperty'
    },

    initialize() {
        
    },

    setProperty(e) {
        var val = e.target.value ? e.target.value.trim() : null,
            name = e.target.name;
        val = val && !_.isEmpty(val) ? val : void 0;
            if (val && !_.isEmpty(val)) {
                if (name.indexOf('.') !== -1) {
                    this.model.set(name,val);
                        
                }
                    


                    
                else {

                    this.model.set(name, val);
                }
            }   
    },

    onBeforeRender() {
        this.templateContext= {
            postTypes:app.postAdTypes.toJSON()
        }
    },

    save() {
        
    },


    back() {
        history.back();
    }
    
});
export default View;