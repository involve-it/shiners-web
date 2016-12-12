import Marionette from 'backbone.marionette';
import template from './CreatePostView.hbs.html';
import app from '../../app.js';
import scriptjs from  'scriptjs'

var View = Marionette.View.extend({
    template:template,
    tagName:'section',
    className:'sh-create-post',
    changeTimeOut:null,
    events: {
        'click #back':'back',
        "change #detailsTitle":'setTitle',
        "change #detailsUrl":'setUrl',
        "change #detailsPrice":'setPrice',
        "change #postType":'setPostType',
        "change #detailsDescription":'setDescription'

    },

    initialize() {
        window.createPostModel = this.model; // debug
        window.postAdTypes = app.postAdTypes; // debug
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

    setUrl(e) {
        var details = this.model.get('details')||{};
        if (e.target.value && !_.isEmpty(e.target.value.trim())) {
            details.url = e.target.value.trim();
        } else {
            delete details.url;
        }
        this.model.set('details',details);
    },

    setPrice(e) {
        var details = this.model.get('details')||{};
        if (e.target.value && !_.isEmpty(e.target.value.trim())) {
            details.price = e.target.value.trim();
        } else {
            delete details.price;
        }
        this.model.set('details',details);
    },

    setPostType(e) {
        var id = e.target.value;
        var postType = app.postAdTypes.get(id);
        if (postType) {
            this.model.set('type',postType.get('name'));
        } else {
            this.model.unset('type');
        }       
    },

    setDescription(e) {  
        if (this.changeTimeOut)
            clearTimeout(this.changeTimeOut);
        this.changeTimeOut = setTimeout(_.bind(() => {
            var val = e.editor.getData();
            val = val && !_.isEmpty(val) ? val.trim() : void 0;
            var details = this.model.get('details')||{};
            if (val && !_.isEmpty(val.trim())) {
                details.description = val.trim();
            } else {
                delete details.description;
            }
            this.model.set('details',details);
        }, this), 400);       
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
        var self = this;
        scriptjs('/lib/ckeditor/ckeditor.js', ()=> {
            CKEDITOR.config.language = 'ru';
            if (CKEDITOR.status == 'loaded') {
                CKEDITOR.replace("detailsDescription");
                CKEDITOR.instances["detailsDescription"].on('change', _.bind(self.setDescription,self));
            } else {
                CKEDITOR.on('loaded',()=>{ 
                    CKEDITOR.replace("detailsDescription");
                    CKEDITOR.instances["detailsDescription"].on('change', _.bind(self.setDescription,self));
                });
            }
        });      
    },

    onBeforeRemove() {
        if(CKEDITOR)
            CKEDITOR.instances["detailsDescription"].destroy();
    },

    save() {
        
    },

    back() {
        history.back();
    }
    
});
export default View;