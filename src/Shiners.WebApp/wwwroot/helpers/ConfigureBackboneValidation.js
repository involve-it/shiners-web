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
// дефолтные сообщения об ошибках
_.extend(Backbone.Validation.messages, {
    required: 'необходимо указать {0}',
    oneOfProperty: 'Вы должны указать либо {0}, либо {1}',
    acceptance: '{0} должно быть принято',
    min: 'значение {0} должно быть больше или равно {1}',
    max: 'значение {0} должно быть меньше или равно {1}',
    range: '{0} must be between {1} and {2}',
    length: '{0} must be {1} characters',
    minLength: '{0} must be at least {1} characters',
    maxLength: '{0} must be at most {1} characters',
    rangeLength: '{0} must be between {1} and {2} characters',
    oneOf: '{0} must be one of: {1}',
    equalTo: '{0} must be the same as {1}',
    digits: '{0} должно состоять из цифр',
    number: 'Укажите {0} обязательно',
    email: 'Введите корректно значение {0}',
    url: 'поле {0} должно быть корректным url-ом',
    inlinePattern: 'введите корректное значение {0}'
});

_.extend(Backbone.Validation.patterns, {
    phone: /^(\+\d{1,3})*\s*(\(\d{3}\)\s*)*\d{3}(-{0,1}|\s{0,1})\d{2}(-{0,1}|\s{0,1})\d{2}$/
});