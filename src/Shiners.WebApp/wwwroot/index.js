﻿import 'jquery';
//import 'bootstrap-loader';
import './lib/bootstrap/dist/js/bootstrap.min.js';
//require("./css/OpenSans.css");
//require("./css/essentials.css");
//require("./css/layout.css");
//require("./css/header-1.css");
//require("./css/color_scheme/blue.css");
//require("./css/custom.css");
//import './lib/font-awesome/css/font-awesome.css';
import './lib/jquery-ui/jquery-ui.min.js';
import moment from 'moment';
//import 'SockJS';
import app from './homeApp/app.js';
_.templateSettings.imports = {
    serverRender() {},
    serverRenderCollection(){}
};
moment.locale('ru');
app.start();