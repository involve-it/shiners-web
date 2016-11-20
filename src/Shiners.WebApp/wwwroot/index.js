import 'jquery';
//import 'bootstrap-loader';
import './lib/bootstrap/dist/js/bootstrap.min.js';
//require("./css/OpenSans.css");
//require("./css/essentials.css");
//require("./css/layout.css");
//require("./css/header-1.css");
//require("./css/color_scheme/blue.css");
//require("./css/custom.css");
//import './lib/font-awesome/css/font-awesome.css';
import './lib/jquery-ui-only-slider/jquery-ui.min.js';
//import moment from 'moment';
import moment from 'moment';
//import 'SockJS';
import app from './homeApp/app.js';
window.serverRender = () => {};
window.serverRenderCollection = () => {};
moment.locale('ru');
//_.templateSettings.imports= {
//    _:require('underscore')
//}
app.start();