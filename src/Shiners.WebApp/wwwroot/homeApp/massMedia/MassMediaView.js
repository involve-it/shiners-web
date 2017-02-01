import Marionette from 'backbone.marionette';
import template from './MassMediaView.hbs.html';
import app from '../app.js';
import  './MassMediaView.less';

var View = Marionette.View.extend({

    template:template,

    onAttach() {
        this.initShTab();
    },



    initShTab() {
        
        jQuery(document).ready(function($){
            function ProductBuilder( element ) {
                this.element = element;
                this.stepsWrapper = this.element.children('.sh-tab-steps');
                this.steps = this.element.find('.builder-step');
                this.mainNavigation = this.element.find('.sh-tab-main-nav');
                // bind builder events
                this.bindEvents();
            }

            ProductBuilder.prototype.bindEvents = function() {
                var self = this;
                //detect click on the left navigation
                this.mainNavigation.on('click', 'li:not(.active)', function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    self.showNewContent($(this).index());
                    self.updatePrimaryNav($(this).index());			
                });
                this.element.find('.click-press-contact').on('click', function(event) {
                    event.preventDefault();
                    self.showNewContent(2);
                    self.updatePrimaryNav(2);
                });
            };

            ProductBuilder.prototype.showNewContent = function(nextStep) {
                var actualStep = this.steps.filter('.active').index() + 1;
                if( actualStep < nextStep + 1 ) {
                    //go to next section
                    this.steps.eq(actualStep-1).removeClass('active back').addClass('move-left');
                    this.steps.eq(nextStep).addClass('active').removeClass('move-left back');
                } else {
                    //go to previous section
                    this.steps.eq(actualStep-1).removeClass('active back move-left');
                    this.steps.eq(nextStep).addClass('active back').removeClass('move-left');
                }
            };

            ProductBuilder.prototype.updatePrimaryNav = function(nextStep) {
                this.mainNavigation.find('li').eq(nextStep).addClass('active').siblings('.active').removeClass('active');
            };
	
            if( $('.sh-tab-builder').length > 0 ) {
                $('.sh-tab-builder').each(function(){
                    //create a productBuilder object for each .cd-product-builder
                    new ProductBuilder($(this));
                });
            }
        });

    }

});
export default View;