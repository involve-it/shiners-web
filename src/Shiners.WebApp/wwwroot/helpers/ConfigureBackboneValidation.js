import Backbone from 'backbone';
import 'backbone-validation'

Backbone.Validation.configure({
    labelFormatter: 'label'
});

_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        if (!_.isEmpty(attr)) {
            var elt = view.$('[' + selector + '~="' + attr + '"]').parent();
            elt.removeClass('has-error').find('.error').remove();
        } else {
            view.$('.summary-errors').empty();
        }
    },

    invalid: function (view, attr, error, selector) {
        Backbone.Validation.callbacks.valid(view, attr, selector);
        if (!_.isEmpty(attr)) {
            var elt = view.$('[' + selector + '~="' + attr + '"]').parent();
            if (!elt.hasClass('has-error')) {
                elt.addClass('has-error');
                elt.append('<small class="error">' + error + '</small>');
            }
        } else {
            var elt = view.$('.summary-errors');
            elt.empty();
            for (var i = 0; i < error.length; i += 1) {
                if (error[i]) {
                    elt.append('<small class="error">' + error[i] + '</small>');
                    elt.append('<br/>');
                }
            }
        }
            
    }
});

function setDefaultValidationMessages() {
    // дефолтные сообщения об ошибках
    _.extend(Backbone.Validation.messages, {
        required: i18n.getI18nString('validation_message_required'),
        oneOfProperty: i18n.getI18nString('validation_message_oneOfProperty'),
        acceptance: i18n.getI18nString('validation_message_acceptance'),
        min: i18n.getI18nString('validation_message_min'),
        max: i18n.getI18nString('validation_message_max'),
        range: i18n.getI18nString('validation_message_range'),
        length: i18n.getI18nString('validation_message_length'),
        minLength: i18n.getI18nString('validation_message_minLength'),
        maxLength: i18n.getI18nString('validation_message_maxLength'),
        rangeLength: i18n.getI18nString('validation_message_rangeLength'),
        oneOf: i18n.getI18nString('validation_message_oneOf'),
        equalTo: i18n.getI18nString('validation_message_equalTo'),
        digits: i18n.getI18nString('validation_message_digits'),
        number: i18n.getI18nString('validation_message_number'),
        email: i18n.getI18nString('validation_message_email'),
        url: i18n.getI18nString('validation_message_url'),
        inlinePattern: i18n.getI18nString('validation_message_inlinePattern'),
    });
}

setDefaultValidationMessages();
$(window).on('sh:language:changed', () => {
    setDefaultValidationMessages();
});


_.extend(Backbone.Validation.patterns, {
    phone: /^(\+\d{1,3})*\s*(\(\d{3}\)\s*)*\d{3}(-{0,1}|\s{0,1})\d{2}(-{0,1}|\s{0,1})\d{2}$/
});