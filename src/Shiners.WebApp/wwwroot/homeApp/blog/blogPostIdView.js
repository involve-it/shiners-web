/**
 * Created by arutu_000 on 1/15/2017.
 */
import Marionette from 'backbone.marionette';

import template from './blogPostIdView.hbs.html';
import './blogPostIdView.less';

var View = Marionette.View.extend({
    template:template,
    onRender() {
        debugger;
    }
});
export default View;