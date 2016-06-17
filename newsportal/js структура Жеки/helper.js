function Helper() {}

Helper.prototype.dateNow = function () {
    var date = new Date();

    return new Date( date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
};

Helper.prototype.monthDetect = function (postMonth, lang) {
    var monthRead = {
        ru: {
            0: 'Января',
            1: 'Февраля',
            2: 'Марта',
            3: 'Апреля',
            4: 'Мая',
            5: 'Июня',
            6: 'Июля',
            7: 'Августа',
            8: 'Сентября',
            9: 'Октября',
            10: 'Ноября',
            11: 'Декабря'
        },
        uk: {
            0: "Січня",
            1: "Лютого",
            2: "Березня",
            3: "Квітня",
            4: "Травня",
            5: "Червня",
            6: "Липня",
            7: "Серпня",
            8: "Вересня",
            9: "Жовтня",
            10: "Листопада",
            11: "Грудня"
        }
    };

    return monthRead[lang][postMonth];
};

Helper.prototype.dateCreate = function (string, lang) {
    var now = this.dateNow();
    var gotDate = new Date(string);
    var month = this.monthDetect( gotDate.getMonth(), lang);
    var postDay = new Date( gotDate.getFullYear(), gotDate.getMonth(), gotDate.getDate()).valueOf();

    if ( postDay < now) {
        console.log( gotDate.getDate().toString() + ' ' + month + ' ' + gotDate.getFullYear().toString());
    } else {
        console.log( gotDate.getHours().toString() + ':' + gotDate.getMinutes().toString());
    }
};

Helper.prototype.findMethod = function (object, string, callback) {
    for (var key in object) {
        if (key == string) {
            callback(object[key]);
        } else if (typeof object[key] == 'object') {
            this.findMethod(object[key], string, callback);
        }
    }
};


Helper.prototype.xhrRequest = function (url, succes) {
    var xhr = new XMLHttpRequest(),
        that = this;
    xhr.open('get', url, true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            succes(xhr.response, that);
        }
    };
    xhr.send();
};

// (new Helper).dateCreate('2016-05-18 11:15:20', 'uk');