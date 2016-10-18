import Marionette from 'backbone.marionette';
import ShinerListItemView from './ShinersListItemView.js';
import EmptyView from './ShinersEmptyView.js';
var View = Marionette.CollectionView.extend({
    className:'height-250 slimscroll',
    tagName:'div',
    emptyView:EmptyView,
    childView:ShinerListItemView,

    onAttach() {
        this.initSlimscroll();
    },

    initSlimscroll() {
        var $el = this.$el;
        var height=$el.height();
        $el.slimScroll({
            size: 				'5px',
            opacity: 			0.4,
            position: 			'right',
            allowPageScroll:	false,
            disableFadeOut: 	false,
            railOpacity: 		0.05,
            alwaysVisible: 		true,
            railVisible: 		true,
            color: 				'#333',
            wrapperClass: 		'slimScrollDiv',
            railColor: 			'#eaeaea',
            height: 			height
        });

        if($el.attr('disable-body-scroll') == 'true') {
            $el.bind('mousewheel DOMMouseScroll', (e)=> {
                var scrollTo = null;
                if (e.type == 'mousewheel') {
                    scrollTo = (e.originalEvent.wheelDelta * -1);
                }
                else if (e.type == 'DOMMouseScroll') {
                    scrollTo = 40 * e.originalEvent.detail;
                }
                if (scrollTo) {
                    e.preventDefault();
                    $el.scrollTop(scrollTo + $el.scrollTop());
                }
            });
        }
    }
});
export default View;