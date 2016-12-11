import Marionette from 'backbone.marionette';
import template from './CreatePostView.hbs.html';
import app from '../../app.js';
import scriptjs from  'scriptjs'

var View = Marionette.View.extend({
    template:template,
    tagName:'section',
    className:'sh-create-post',
    events: {
        'click #back':'back',
        "change #detailsTitle":'setTitle',
        "change #detailsUrl":'setUrl',
        "change #detailsPrice":'setPrice',
        "change #postType":'setPostType',
        "change #detailsDescription":'setDescription',
        "change #detailsUrl":'setUrl',
    },

    initialize() {
        window.createPostModel = this.model; // debug
    },

    setTitle(e) {
        var details = this.model.get('details')||{};
        if (e.target.value && !_.isEmpty(e.target.value.trim())) {
            details.title = e.target.value.trim();
        } else {
            delete details.title;
        }
        this.model.set('details',details);
    },

    //setProperty(e) {
    //    var val = e.target.value ? e.target.value.trim() : null,
    //        name = e.target.name;
    //    val = val && !_.isEmpty(val) ? val : void 0;

    //    if (name.indexOf('.') !== -1) {
    //        var parts = name.split('.');
    //        var propName = parts[0];
    //        var prop = this.model.get(propName)||{};
            

    //    } else {
    //        this.model.set(name, val);
    //    }
    //    this.model.set(name,val);
    //},

    onBeforeRender() {
        this.templateContext= {
            postTypes:app.postAdTypes.toJSON()
        }
    },

    onAttach() {
        this.initHtmlEditor();
    },

    initHtmlEditor() {
        //ru-RU
        scriptjs('/lib/ckeditor/ckeditor.js', function() {
            CKEDITOR.config.language = 'ru';
            CKEDITOR.replace("detailsDescription");
        });
        
    },

    save() {
        
    },

    back() {
        history.back();
    }
    
});
export default View;