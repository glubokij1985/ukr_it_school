function Helper(){};

Helper.prototype.today = function(){
    var date = new Date(),
        current = new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
    return current;
};

Helper.prototype.getMounth = function(mounth, lang){            
    var mounthObject = {
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
    return mounthObject[lang][mounth];
};

Helper.prototype.compareDate = function(date, lang){
    var self = this;
    var onlyDate = date.split(' ')[0],
        onlyTime = date.split(' ')[1],
        curDate = new Date(onlyDate),
        currentDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate()).valueOf(),
        now = self.today();
    if(now > currentDate){
        return curDate.getDate() + ' ' + self.getMounth(curDate.getMonth(), lang) + ' ' + curDate.getFullYear();
    } else {
        return onlyTime;
    }
};

Helper.prototype.getElemByAttr = function(attr){
    var arrElemsByAttr = [];
    var allElems = document.getElementsByTagName('*');
    for(var i = 0; i < allElems.length; i++){
        if(allElems[i].getAttribute(attr) != null){
            arrElemsByAttr.push(allElems[i]);
        }
    };
    return arrElemsByAttr;
};