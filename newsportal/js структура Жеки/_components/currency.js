function Currency(elem) {
    this.wrap = elem;
    this.xhrRequest('http://' + location.hostname + '/site/tryCurrency', this.succes.bind(this));
}

Currency.prototype = Object.create(App.prototype);
Currency.prototype.constructor = Currency;

Currency.prototype.helper = function (elem) {
    return  {
        rateBuy: elem.rateBuy,
        rateBuyDelta: elem.rateBuyDelta,
        rateSale: elem.rateSale,
        rateSaleDelta: elem.rateSaleDelta
    };
};


Currency.prototype.succes = function (data,that) {
    var banks = [],
        current = '',
        dataObj = JSON.parse(data),
        needBanks = ['ПУМБ', 'Укрсоцбанк', 'ПриватБанк'];

    for (var i = 0; i < dataObj.length; i++) {
        if (current !== dataObj[i].bankName) {
            if (obj && Object.keys(obj).length > 0) {
                banks.push(obj);
            }
            var obj = {};
            if(needBanks.indexOf(dataObj[i].bankName) == -1){
                continue;
            }
            obj.bankName = dataObj[i].bankName;

            obj[dataObj[i].codeAlpha] = that.helper(dataObj[i]);
        } else {
            obj[dataObj[i].codeAlpha] = that.helper(dataObj[i]);
        }

        current = dataObj[i].bankName;
    }
    
    that.construct(banks);
};

Currency.prototype.numbers = function(elem) {
    var objSale = {},
        toHight = '<i class="-to-hight"> &nbsp; &#9650;</i>',
        toLow = '<i class="-to-low"> &nbsp; &#9660;</i>';
    objSale.numberBuy =  '<span><mark>' + (+elem.EUR.rateBuy).toFixed(2) + '</mark>' + (elem.EUR.rateBuyDelta!==0 ? (elem.EUR.rateBuyDelta > 0 ? toHight : toLow) : '') + '</span>' +
                        '<span><mark>' + (+elem.USD.rateBuy).toFixed(2) + '</mark>' + (elem.USD.rateBuyDelta!==0 ? (elem.USD.rateBuyDelta > 0 ? toHight : toLow) : '') + '</span>' +
                        '<span><mark>' + parseFloat(elem.RUB.rateBuy).toFixed(2) + '</mark>' + (elem.RUB.rateBuyDelta!==0 ? (elem.RUB.rateBuyDelta > 0 ? toHight : toLow) : '') + '</span>';
    objSale.numberSale = '<span><mark>' + (+elem.EUR.rateSale).toFixed(2) + '</mark>' + (elem.EUR.rateSaleDelta!==0 ? (elem.EUR.rateSaleDelta > 0 ? toHight : toLow) : '') + '</span>' +
                        '<span><mark>' + (+elem.USD.rateSale).toFixed(2) + '</mark>' + (elem.USD.rateSaleDelta!==0 ? (elem.USD.rateSaleDelta > 0 ? toHight : toLow) : '') + '</span>' +
                        '<span><mark>' + parseFloat(elem.RUB.rateSale).toFixed(2) + '</mark>' + (elem.RUB.rateSaleDelta!==0 ? (elem.RUB.rateSaleDelta > 0 ? toHight : toLow) : '') + '</span>';

    return objSale;
};

Currency.prototype.rows = function (obj) {
    var template = '';
    for ( var i=0; i<obj.length; i++) {
        template += '<tr>' +
                            '<td>' +
                                '<p>' +
                                    '<i>' + obj[i].bankName + '</i>' +
                                '</p>' +
                            '</td>' +
                            '<td>' +
                                '<span><b>&euro;</b></span>' +
                                '<span><b>$</b></span>' +
                                '<span><b>R</b></span>' +
                            '</td>' +
                            '<td>' +
                                this.numbers(obj[i]).numberBuy +
                            '</td>' +
                            '<td>' +
                                this.numbers(obj[i]).numberSale +
                            '</td>' +
                        '</tr>';
    }
    return template;
};

Currency.prototype.construct = function(obj) {
    var template = '<table class="-new-currensy">' +
                        '<tr>' +
                            '<th>' +
                                '<span>Банк</span>' +
                            '</th>' +
                            '<th>' +
                                '<span style="font-size:18px">&#402;</span>' +
                            '</th>' +
                            '<th>' +
                                '<span>Покупка</span>' +
                            '</th>' +
                            '<th>' +
                                '<span>Продажа</span>' +
                            '</th>' +
                        '</tr>' +
                        this.rows(obj) +
                    '</table>';

    this.wrap.insertAdjacentHTML('afterBegin', template);
};
