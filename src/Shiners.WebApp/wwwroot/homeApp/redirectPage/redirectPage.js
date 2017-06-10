import Marionette from 'backbone.marionette';
import PreloaderView from '../../sharedViews/PreloaderView.js';
import template from './redirectPage.hbs.html';
import RedirectPageView from './RedirectPageView.js';
import app from '../app.js';
import  './redirectPage.less';

var View = Marionette.View.extend({
    template: template,
    ios: false,
    android: false,
    desktop: false,

    initialize() {
        if( app.device && app.device.ios() ) {
            console.log('IOS');
            this.ios = true;
        } else if( app.device && device.android() ) {
            this.android = true;
            console.log('ANDROID');
        } else {
            this.desktop = true;
            console.log('DESKTOP');
        }
    },

    regions: {
        'container' : '#sh-redirect-container'
    },

    events: {},

    onAttach() {},

    onRender() {
        var lang = i18n.getLanguage();

        if(this.ios) {
            this.showChildView('container',new RedirectPageView({title: 'iOS', device: 'iOS', link: (lang === 'en') ? 'https://itunes.apple.com/us/app/shiners/id1136502367?mt=8' : 'https://itunes.apple.com/ru/app/shiners/id1136502367?mt=8'}));
        } else if(this.android) {
            this.showChildView('container',new RedirectPageView({title: 'Android', device: 'Android', link: (lang === 'en') ? 'https://play.google.com/store/apps/details?id=org.buzzar.app&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' : 'https://play.google.com/store/apps/details?id=org.buzzar.app&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'}));
        } else if (this.desktop) {
            //Backbone.history.navigate('/', {trigger: true});
            window.location.replace("//shiners.ru");
        }
    }
});

export default View;