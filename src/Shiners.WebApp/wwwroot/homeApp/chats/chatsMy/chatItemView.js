import Marionette from 'backbone.marionette';
import template from './chatItemView.hbs.html';
import app from '../../app.js';
import './chatItemView.css';

var View = Marionette.View.extend({
    template:template,
    onBeforeRender() {
        //this.getDistance();
    },
    getDistance() {
        // todo
    },
    events: {
        '.js-remove-my-post click': ()=>{
            //debugger;
        },
        '.js-edit-my-post click': ()=>{
            //debugger;
        }
    }
});
export default View;