import Marionette from 'backbone.marionette';
import template from './AboutView.hbs.html';
import app from '../app.js';
import  './about.less';

var View = Marionette.View.extend({
    template:template,

    events: {
        'submit form':'sendMessage'
    },

    onAttach() {
        this.initStickMenu();
    },

    sendMessage(e) {
        e.preventDefault();
        var text = this.$('#message_text').val(),
            name=this.$('#user_name').val(),
            email = this.$('#user_email').val();

        var msg = "user: " + name + "\n" + "email: " + email + "\n" + text;
        var self = this;
        app.asteroid.call('sendMessageContactUs', msg).result.then(() => {
            alert('Сообщение отправлено');
            self.render();
        }) ;
    },
    initStickMenu() {
        
        setTimeout(function() {
            var secondaryNav = $('.sh-secondary-nav');

            if(secondaryNav.length > 0) {
                var topPosition = secondaryNav.offset().top,
                    shIntroTaglineTop = $('.sh-intro-tagline-wrapper').offset().top + $('.sh-intro-tagline-wrapper').height() + parseInt($('.sh-intro-tagline-wrapper').css('paddingTop').replace('px', '')),
                    contentSections = $('.sh-section');
        
                $(window).on('scroll', function(){

                    ( $(window).scrollTop() > shIntroTaglineTop ) ? $('.sh-logo-about-us, .sh-create-about-us').addClass('is-hidden') : $('.sh-logo-about-us, .sh-create-about-us').removeClass('is-hidden');
	
                    //on desktop - fix secondary navigation on scrolling
                    if( $(window).scrollTop() > topPosition ) {                    
                        secondaryNav.addClass('is-fixed');
                        $('.sh-content').addClass('has-top-margin');
                        setTimeout(function() {
                            secondaryNav.addClass('sh-animated');
                            $('.sh-logo-about-us').addClass('slide-in');
                            $('.sh-create-about-us').addClass('slide-in');
                        }, 50);
                    } else {
                        secondaryNav.removeClass('is-fixed');
                        $('.sh-content').removeClass('has-top-margin');
                        setTimeout(function() {
                            secondaryNav.removeClass('sh-animated');
                            $('.sh-logo-about-us').removeClass('slide-in');
                            $('.sh-create-about-us').removeClass('slide-in');
                        }, 50);
                    }
		
                    updateSecondaryNavigation();
                });

                function updateSecondaryNavigation() {
                    contentSections.each(function(){
                        var actual = $(this),
                                actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
                                actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
                        if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
                            actualAnchor.addClass('active');
                        }else {
                            actualAnchor.removeClass('active');
                        }
                    });
                }

                secondaryNav.find('ul a').on('click', function(event){
                    event.preventDefault();
                    event.stopPropagation();

                    var target= $(this.hash);
                    $('body,html').animate({
                        'scrollTop': target.offset().top - secondaryNav.height() + 1
                    }, 400
                    );
                });
            }
        }, 500);       

    }
});
export default View;