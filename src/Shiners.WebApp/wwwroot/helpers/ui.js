var Ui = {}

Ui.showSpinner = function(selector) {
    console.log('show spinner, selector: ' + (selector ? selector : 'global'));
}

Ui.hideSpinner = function (selector) {
    console.log('hide spinner, selector: ' + (selector ? selector : 'global'));
}

Ui.alert = function (msg) {
    console.log('alert: ' + msg);
    alert(msg);
}

Ui.info = function (msg) {
    console.log('info: ' + msg);
    alert(msg);
}
Ui.spinnerShowOn$element = function (button) {
    button.removeClass('fa-check').addClass('fa-spinner').addClass('fa-spin');
    button.parent().addClass('disabled');
}
Ui.spinnerHideOn$element = function (button) {
    button.addClass('fa-check').removeClass('fa-spinner').removeClass('fa-spin');
    button.parent().removeClass('disabled');
}
$h.ui = Ui;
module.exports = Ui;