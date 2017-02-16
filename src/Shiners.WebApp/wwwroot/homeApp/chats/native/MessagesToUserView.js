import Marionette from 'backbone.marionette'
import template from './MessagesToUserView.hbs.html'
import MessagesView from './MessagesListView.js'
import Model from '../../../data/AsteroidModel.js'
import './messagesToUserView.less';
import app from '../../app.js'
var View = Marionette.View.extend({

    template:template,
    className: 'sh-content',
    tagName:'div',

    regions: {
        'messages':'#messagesList'
    },

    onRender() {
        this.showChildView('messages',new MessagesView({collection:this.collection, model:this.model, childViewOptions:{ chat:this.model}}));
    },

    events:{
        'submit form':'sendMessage',
        'keyup #messageText': function(e) {

            var messText = $.trim($('#messageText').val());

            if (messText.length > 0) {
                var btn = $('.sh-messages-input-action').find('button');
                if(btn.hasClass('disabled')) {
                    $('.sh-messages-input-action').find('button').removeClass('disabled');
                }                                
            } else {
                $('.sh-messages-input-action').find('button').addClass('disabled');
                return;
            }

            if (e.charCode === 13 || e.keyCode === 13) {
                this.sendMessage(e);
            }
        }
    },

    onAttach() {        
        this.messagesList_listenToResize();
        this.keyupInput();
        this.scrollMessages();
    },

    onDomRefresh() {
        this.messagesList();
    },

    sendMessage(e) {
        e.preventDefault();
        var $textEl = this.$('#messageText'); 
        var value = ($textEl.val()||"").trim();
        if (!_.isEmpty(value)) {
            var model = new Model({
                text: value,
                timestamp: new Date(),
                userId: this.model.get('user')._id,
                toUserId: this.model.get('remoteUser')._id,
                chatId: this.model.id
            },{asteroid:app.asteroid});
            //this.collection.add(model);

            model.save('addMessage',{destinationUserId:this.model.get('remoteUser')._id,message:value,type:'text',associatedPostId:this.model.get('postId')});
            $textEl.val('');
            $textEl.focus();

            this.scrollMessages();
        }
    },

    messagesList() {
        var windowH = $(window).height(),
            content = $('.sh-messages-to-user-content'),
            header = $('#header').outerHeight(),
            messagesHeader = $('.sh-messages-to-user-header').outerHeight(),
            messagesFooter = $('.sh-messages-to-user-input').outerHeight(),
            footer = 0,
            padding = parseInt($('.sh-messages-to-user').css('paddingTop').replace('px', '')) + parseInt($('.sh-messages-to-user').css('paddingBottom').replace('px', ''));

        if(app.isMobile) {
            //footer hide here
            console.log('mobile foorter'); //debug
            footer = 0;
        } else {
            footer =  $('#footer').outerHeight();
        }

        content.css( 'height', (windowH - header - footer - messagesHeader - messagesFooter - padding) );
    },

    messagesList_listenToResize() {
        $(window).resize(_.bind(this.messagesList, this));
    },

    keyupInput() {
        var that = this;
        $.each($('textarea[data-autoresize]'), function() {
            var offset = this.offsetHeight - this.clientHeight;
            var resizeTextarea = function(el) {
                $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
            };

            $(this).on('keyup input', function() {
                if(this.scrollHeight > 44) {
                    resizeTextarea(this);            
                    that.messagesList();
                }
            }).removeAttr('data-autoresize');
        });
    },

    scrollMessages() {
        var element = $('.sh-messages-to-user-content').find('ul'),
            container = element.closest('div');
        if(element.length && container.length > 0) {
            container.stop().animate({scrollTop: element[0].scrollHeight}, 250, 'swing');
        }
    }


});
export default View;