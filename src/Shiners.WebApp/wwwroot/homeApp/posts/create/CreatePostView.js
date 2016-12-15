import Marionette from 'backbone.marionette';
import template from './CreatePostView.hbs.html';
import app from '../../app.js';
import scriptjs from  'scriptjs'
import ImagesView from './UploadedImagesView.js'
import LocationView from './SelectedLocationView.js'
import ModalView from '../../../sharedViews/ModalContainerView.js'
import SuccessView from '../../../sharedViews/ModalContainerView.js'
import LocationMapView from './LocationMapView.js'
import 'bootstrap-datepicker'

var View = Marionette.View.extend({
    template: template,
    tagName: 'section',
    className: 'sh-create-post',
    changeTimeOut: null,
    images: null,
    events: {
        'click #back': 'back',
        "change #detailsTitle": 'setTitle',
        // "change #detailsUrl":'setUrl',
        //"change #detailsPrice":'setPrice',
        "change #postType": 'setPostType',
        "change #detailsDescription": 'setDescription',
        "click #saveShiner": 'save',
        'click #addImgButton': 'showImageDialog',
        'change #addImgInput': 'uploadImage',
        'click #selectLocation': 'onSelectLocation',
        'change #dateDurationSelect': 'setFixedDuration',
        'change #dateDuration': 'setDate',
        'change #anonymous-post':'setAnonimous'
    },

    regions: {
        'images':'#uploadedImages',
        'location':'#locationName',
        'modal':'#modalContainer'
    },

    modelEvents: {
        'change':'toggleCreateButton',
        'save':'showSuccess',
        'error:save':'showError'
    },

    initialize() {
        window.createPostModel = this.model; // debug
        this.images = new Backbone.Collection();
        this.selectedLocation = new Backbone.Model({
            coords:app.user.get('position')
        });
        this.listenTo(this.selectedLocation,'change', this.showLocation);
        this.listenTo(this.selectedLocation,'change', this.setLocation);
        this.listenTo(this.images,'change',this.setImages);
        window.uploadedImages = this.images; // debug
    },

    setAnonimous(e) {
        this.model.set('anonymousPost',e.target.checked);
    },

    setLocation() {
        var details = this.model.get('details');
        var location = this.selectedLocation.toJSON()||{};
        if (location["name"]) {
            location["userId"] = app.user.id;
            location["public"] = false;
            details.locations = [location];
            this.model.set('details',details,{validate:true});
        }       
    },

    setImages() {
        var details = this.model.get('details');
        var images = [];
        this.images.each((img) => {
            if (img.has('data')) {
                images.push(img.toJSON());
            }
        },this);
        details.photos = images;
        this.model.set('details', details);
    },

    setTitle(e) {
        var details = this.model.get('details')||{};
        if (e.target.value && !_.isEmpty(e.target.value.trim())) {
            details.title = e.target.value.trim();
        } else {
            delete details.title;
        }
        this.model.set('details',details,{validate:true});
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
        this.model.set('type',postType?postType.get('name'):void 0,{validate:true});    
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

    onBeforeRender() {
        this.templateContext= {
            postTypes:app.postAdTypes.toJSON()
        }
    },

    onRender() {
        this.showChildView('images',new ImagesView({collection:this.images}));
        this.showChildView('location', new LocationView({model:this.selectedLocation}));
    },

    onAttach() {
        this.initHtmlEditor();
        this.initDatepicker();
        Backbone.Validation.bind(this);
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

    initDatepicker() {
        this.$('#dateDuration').datepicker({
            language:'ru',
            format:'dd/mm/yyyy'
        });
    },

    setFixedDuration(e) {
        var hours = parseInt(e.target.value);
        var ms = hours * 3600000;
        var dateMoment = moment();    
        dateMoment=dateMoment.add(ms);
        this.$('#dateDuration').datepicker('setDate',dateMoment.toDate());
    },

    setDate(e) {
        if (e.target.value && !_.isEmpty(e.target.value)) {
            var val = moment(e.target.value,"DD/MM/YYYY");
            this.model.set('endDatePost', val.unix());
        }      
    },

    onBeforeRemove() {
        if(CKEDITOR)
            CKEDITOR.instances["detailsDescription"].destroy();
        Backbone.Validation.unbind(this);
    },

    showImageDialog() {
        this.$('#addImgInput').trigger('click');
    },

    uploadImage: function (e) {
        var re_text = /\.bmp|\.jpeg|\.jpg|\.png/i;
        if (e.target.value.search(re_text) == -1) {
            alert("Некорректное расширение картинки\n Должно быть  bmp, jpeg, jpg, png ");
            e.target.form.reset();
        } else {
            var data = new FormData();
            var files = $(e.target).get(0).files;
            // Add the uploaded image content to the form data collection
            if (files.length > 0) {
                data.append("UploadedImage", files[0]);
            }
            var model = new Backbone.Model();
            this.images.add(model);
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "/Img/UploadTempImage?cid="+model.cid,
                contentType: false,
                processData: false,
                data: data
            });
            var self = this;
            ajaxRequest.done(function (resp,textStatus, xhr) {
                if (textStatus === 'success') {
                    var m = self.images.get(resp.cid);
                    m.set('data',resp.path);
                }
            });
        }
    },

    onSelectLocation(e) {
        this.showChildView('modal', new ModalView({view:new LocationMapView({model:this.selectedLocation}),title:'Выбор местоположения'}));
    },
    toggleCreateButton() {
        var errors = this.model.validate();
        var $btn = this.$('#saveShiner');
       if (!errors) {
           $btn.removeClass('disabled');
       } else {
           if(!$btn.hasClass('disabled'))
               $btn.addClass('disabled');
       }
    },

    save() {
        if (!this.model.validate()) {
            var model = this.model;
            var photos = model.get('details').photos;
            if (photos && !_.isEmpty(photos)) {               
                $.ajax({
                    type: "POST",
                    url: "/Img/CommitUploadImage",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(photos)
                }).done(resp => {
                    var details = model.get('details');
                    details.photos = resp;
                    model.set('details', details);
                    model.create();
                });
            } else {
                model.create();
            }
        }
    },

    showSuccess() {
        this.showChildView('modal',new ModalView({
            view:new SuccessView({
                resultUrl:'/posts/'+this.model.id,
                title:'Новый светлячок успешно установлен и доступен для пользователей.',
                message:'Перейдите на персональную страницу Вашего объявления для просмотра визитов, комментариев и другой информации.'
            }),
            title:'Поздравляем, Вы добавили новый светлячок!'
        }) );
    },

    showError(er) {
        alert("Ошибка создания поста. "+er);
    },

    back() {
        history.back();
    }
    
});
export default View;