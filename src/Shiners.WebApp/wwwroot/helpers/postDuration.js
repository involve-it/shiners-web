var helper = {
    getPostDuration: function(model) {        
       
        var modelJSON = model.toJSON(), status = true, now = new Date(), start, finish, duration, days, hours, min, percent, barClass, language, titleDays, titleHours, titleMinutes, unit;

        if(!modelJSON.timestamp.$date && !modelJSON.endDatePost.$date) return;
        start = modelJSON.timestamp.$date;
        finish = modelJSON.endDatePost.$date;

        /* ALL ms or 100% */
        duration = finish - start;

        /* left time */
        var ms = (modelJSON.status.visible) ? finish - now : ms = modelJSON.timePause.$date;
       
        days = Math.floor(ms / 86400000);
        hours = Math.floor((ms - (days * 86400000)) / 3600000);
        min = Math.floor((ms - (days * 86400000) - (hours * 3600000)) / 60000);

        percent = ms / duration * 100;

        /* get barClass */
        if( percent < 20 ) {
            barClass = 'red';
        } else if( percent < 50 ) {
            barClass = 'yellow';
        } else if( percent >= 50 ) {
            barClass = 'green';
        }

        /* will close the post */
        if( percent <= 0 ) {
            percent = 0;
            status = false;

            // update the status on visible, null
            var object = {'status': {visible: null}, timePause: 0};            
            model.loadByMethod('timePostUpdate', modelJSON._id, object);
        }

        language = app.i18n.getLanguage();

        function endingOfTheWord(lang, number, title, titleEng) {
            if( lang === 'en' ) {
                var eng = [0, 1];
                return titleEng[ (number > 1) ? 1 : 0 ];
            } else if( lang === 'ru' ) {
                var rus = [2, 0, 1, 1, 1, 2];
                return title[ (number%100>4 && number%100<20) ? 2 : rus[ (number%10<5) ? number%10 : 5 ] ];
            }
        }

        if(days > 1) {
            titleDays = endingOfTheWord(language, days, ['день', 'дня', 'дней'], ['day', 'days']);
            unit = days + ' ' + titleDays;
        } else if(days == 1) {
            titleDays = endingOfTheWord(language, days, ['день', 'дня', 'дней'], ['day', 'days']);
            titleHours = endingOfTheWord(language, hours, ['час', 'часа', 'часов'], ['hour', 'hours']);
            titleMinutes = endingOfTheWord(language, min, ['минута', 'минуты', 'минут'], ['minute', 'minutes']);
            unit = (hours == 0) ? days + ' ' + titleDays + '   ' + min + ' ' + titleMinutes : days + ' ' + titleDays + '   ' + hours + ' ' + titleHours;
        } else if(days == 0) {
            titleHours = endingOfTheWord(language, hours, ['час', 'часа', 'часов'], ['hour', 'hours']);
            titleMinutes = endingOfTheWord(language, min, ['минута', 'минуты', 'минут'], ['minute', 'minutes']);
            unit = (days == 0 && hours == 0) ? min + ' ' + titleMinutes : hours + ' ' + titleHours + '   ' + min + ' ' + titleMinutes;
        }

        return {
            'percent': percent,
            'leftDays': days,
            'unit': unit,
            'barClass': barClass,
            'status': status
        };
    }
}

_.extend(global.$h.help, helper);
export default helper;