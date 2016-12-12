/**
 * Created by arutu_000 on 12/9/2016.
 */
const DEFAULT_LANGUAGE = 'ru';
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
            if (key && lang) {
                var newText = dataGlobal[lang][key];
                this.text(newText);
            }
        }
        $(window).on('sh:language:changed', (e, lang) => {
            $('tran').translate(lang);
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