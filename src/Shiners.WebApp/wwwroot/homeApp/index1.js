//require('bootstrap');
//import 'bootstrap-loader';
//import JQuery from 'jquery';
import 'jquery-ui';

//require("./css/OpenSans.css");
//require("./css/essentials.css");
import 'style!raw!./css/layout.css';
//require("./css/layout.css");
//require("./css/header-1.css");
//require("./css/color_scheme/blue.css");
//require("./css/custom.css");

import app from './homeApp/app.js';
import './lib/form.slidebar/jquery-ui-slider-pips.min.js';
app.start();
JQuery(document)
            .ready(function() {
                JQuery("#slider3")
                    .slider({
                        range: "min",
                        animate: true,
                        min: 1,
                        max: 50,
                        step: 10,
                        value: 10,
                        slide: function(event, ui) {
                            JQuery("#bedrooms").val(ui.value);
                        }
                    });

                JQuery("#bedrooms").val($("#slider3").slider("value"));
                JQuery("#slider3").slider("pips", { rest: "label" });

});