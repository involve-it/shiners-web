import 'jquery';
import 'jquery.cookie';
import './helpers/helpers';
import i18n from './js/controllers/templateController.js';
import './lib/bootstrap/dist/js/bootstrap.min.js';
import './lib/jquery-ui-only-slider/jquery-ui.min.js';
import moment from 'moment';

import app from './homeApp/app.js'
window.serverRender = () => {};
window.serverRenderCollection = () => {};
moment.locale('ru');
app.start();