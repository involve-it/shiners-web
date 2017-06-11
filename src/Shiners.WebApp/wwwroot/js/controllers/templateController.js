/**
 * Created by arutu_000 on 12/9/2016.
 */
Object.assign = Object.assign || require('object.assign');

const DEFAULT_LANGUAGE = getCookie('language') || 'ru';

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var dataGlobal = {},
    currentLanguage = DEFAULT_LANGUAGE;

var i18n = function(name) {
    var ret, lang = i18n.getLanguage(),
        template = function(key, value) { return `<tran data-key="${ key }">${ value }</tran>`};
    var dataLang = dataGlobal[lang];
    if (name && dataLang) {
        ret = dataLang[name];
        ret = template(name, ret);
    }

    return ret;
}

Object.assign(i18n, {
    init: function() {
        $.fn.translate = function(lang) {
            var key = $(this).data('key');
            console.info(key);
            if (key && lang) {
                var newText = dataGlobal[lang][key];
                this.text(newText);
            }
        }
        $(window).on('sh:language:changed', (e, lang) => {
            $('tran').each(function() {
                $(this).translate(lang);
            });

            $('[data-i18n-name]').each(function() {
                var attr = $(this).attr('data-i18n-name');
                var key = $(this).attr('data-i18n-key');
                var newText = dataGlobal[lang][key];
                $(this).attr(attr, newText);

            });
        })
    },
    add: function(lang, data) {
        if (lang && data) {
            if (!dataGlobal[lang]) {
                dataGlobal[lang] = {}
            }
            dataGlobal[lang] = Object.assign(dataGlobal[lang], data);
        }
    },
    getLanguage() {
        return currentLanguage || DEFAULT_LANGUAGE;
    },
    setLanguage(lang) {
        if (lang && lang !== i18n.getLanguage()) {
            currentLanguage = lang;
            emitEvent(lang);
            return true;
        } else {
            return false;
        }
    },
    getI18nString(name) {
        var ret, lang = i18n.getLanguage();
        var dataLang = dataGlobal[lang];
        if (name && dataLang) {
            ret = dataLang[name];
        }
        return ret;
    },

    setI18nAttribute(attr, key ) {
        var ret, lang = i18n.getLanguage();
        var dataLang = dataGlobal[lang];

       var template = function(attr, key, value) { return ` data-i18n-name="${ attr }" data-i18n-key="${ key }" ${attr}="${ value }" `};

        if (key && dataLang) {
            ret = dataLang[key];
            ret = template(attr, key, ret);
        }
        return ret;
    }
});

function emitEvent(lang) {
    $(window).trigger('sh:language:changed', lang);
}
window.i18n = i18n;
i18n.init();
/*_.templateSettings = Object.assign({
    evaluate    : /<%([\s\S]+?)%>/g
}, _.templateSettings);*/
export default i18n;