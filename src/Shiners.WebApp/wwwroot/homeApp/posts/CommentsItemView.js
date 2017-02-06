import Marionette from 'backbone.marionette';
import template from './CommentsItemView.hbs.html';


var View = Marionette.View.extend({

    className: 'sh-reviews-item',
    template: template

});

export default View;