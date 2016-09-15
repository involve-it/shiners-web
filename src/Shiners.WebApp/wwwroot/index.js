
import 'bootstrap-loader';
require("./css/OpenSans.css");
require("./css/essentials.css");
require("./css/layout.css");
require("./css/header-1.css");
require("./css/color_scheme/blue.css");
require("./css/custom.css");

import 'jquery-ui';
import './lib/form.slidebar/jquery-ui-slider-pips.min.js';
import app from './homeApp/app.js';

app.start();
