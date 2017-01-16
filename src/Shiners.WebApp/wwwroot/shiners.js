/**
 * Created by douson on 22/11/2016.
 */

$('.sh-choose-language .ui.selection.dropdown').dropdown("set selected", "0");

$('.sh-header-dropdown-user .ui.dropdown').dropdown();

$('.ui.accordion.sh-accordion').accordion();

/*
//Open modal window
$('.sh-show-modal-city').on('click', function() {
  $('.ui.modal').modal('show');
});*/


jQuery(document).ready(function($){
	
	var navTabMenu = $('.sh-post-tab-menu-wrapper');
	
	if(navTabMenu.length > 0) {
		var navTabMenuTopPosition = navTabMenu.offset().top,
				contentSections = $('.sh-section');
		
		$(window).scroll(function() {

			if ($(window).scrollTop() > $('.sh-post-tab-menu').offset().top + 10) {
				$('.sh-post-tab-menu-wrapper').addClass('stick-menu');
				$('.sh-post-tab-menu-sticky').removeClass('hidden')
			}
			else {
				$('.sh-post-tab-menu-wrapper').removeClass('stick-menu');
				$('.sh-post-tab-menu-sticky').addClass('hidden')
			}

			updateNavigation();
		});

		//smooth scroll when clicking navTabMenu
		navTabMenu.find('ul a').on('click', function(event) {
			event.preventDefault();
			var target= $(this.hash);

			$('body, html').animate({
				'scrollTop': target.offset().top - navTabMenu.height() - 10
			}, 400);
		});

		function updateNavigation() {
			contentSections.each(function() {
				var actual = $(this),
						actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
						actualAnchor = navTabMenu.find('a[href="#'+actual.attr('id')+'"]');

				if ( ( actual.offset().top - navTabMenu.height() - 12 <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - navTabMenu.height() - 12 > $(window).scrollTop() ) ) {
					actualAnchor.addClass('active');
				} else {
					actualAnchor.removeClass('active');
				}
			});
		}
	}
	
	
});