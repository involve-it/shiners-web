﻿import 'jquery';
import 'jquery.cookie';
import './helpers/helpers';
import './lib/bootstrap/dist/js/bootstrap.min.js';
import './lib/jquery-ui-only-slider/jquery-ui.min.js';
import moment from 'moment';

import app from './homeApp/app.js'
window.serverRender = () => {};
window.serverRenderCollection = () => {};
moment.locale('ru');
app.start();