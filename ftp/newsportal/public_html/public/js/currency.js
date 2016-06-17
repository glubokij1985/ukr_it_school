function Currency(){
	var self = this;
	var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://' + location.hostname + '/site/tryCurrency', true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var xhrObject = JSON.parse(xhr.responseText);
			self.getBanksObj(xhrObject);
	      }
    };

    xhr.send();    
};

Currency.prototype = Object.create(App.prototype);
Currency.prototype.constructor = Currency;

Currency.prototype.getBanksObj = function(xhrObject){
	var bankObj = [],
		current = "",
		arrBanks = ['ПриватБанк', 'ПУМБ', 'Укрсоцбанк'];
	for (var i = 0; i < xhrObject.length; i++) {
		if(current != xhrObject[i].bankName){
			if(obj && Object.keys(obj).length > 0){
				bankObj.push(obj);
			};
			var obj = {};
			if(arrBanks.indexOf(xhrObject[i].bankName) == -1){
				continue;
			};
			obj.bankName = xhrObject[i].bankName;
			obj[xhrObject[i].codeAlpha] = {
				rateBuy: xhrObject[i].rateBuy,
				rateBuyDelta: xhrObject[i].rateBuyDelta,
				rateSale: xhrObject[i].rateSale,
				rateSaleDelta: xhrObject[i].rateSaleDelta
			}
		} else {
			obj[xhrObject[i].codeAlpha] = {
				rateBuy: xhrObject[i].rateBuy,
				rateBuyDelta: xhrObject[i].rateBuyDelta,
				rateSale: xhrObject[i].rateSale,
				rateSaleDelta: xhrObject[i].rateSaleDelta
			}
		};
		current = xhrObject[i].bankName;
	};
	this.getBanksHTML(bankObj);
};

Currency.prototype.generate = function(obj, rate, rateDelta){
	var template = '<span><mark>' + 
	                  (obj.EUR ? obj.EUR[rate] : '') + 
	                '</mark>' + 
	                	((obj.EUR[rateDelta] > 0) ? '<i class="-to-hight">&#9650;</i>' : '<i class="-to-low">&#9660;</i>') + 
	                '</span>' + 
	                '<span><mark>' + 
	                  (obj.USD ? obj.USD[rate] : '') +
	                '</mark>' +
	                	((obj.USD[rateDelta] > 0) ? '<i class="-to-hight">&#9650;</i>' : '<i class="-to-low">&#9660;</i>') +
	                '</span>' +
	                '<span><mark>' + 
	                  (obj.RUB ? obj.RUB[rate] : '') +
	                '</mark>' +
					  ((obj.RUB[rateDelta] > 0) ? '<i class="-to-hight">&#9650;</i>' : '<i class="-to-low">&#9660;</i>') +
	                '</span>';
	return template;
};

Currency.prototype.getBanksHTML = function(bankObj){
  var curWrap = document.querySelector('.-with-before.-currency-val');
  var bank = '';

  for(var i = 0; i < bankObj.length; i++){
	  bank += '<tr>' +
	            '<td>' +
	                '<p><i>' + bankObj[i].bankName + '</i></p>' +
	            '</td>' +
	            '<td>' +
	                '<span>' +
	                  (bankObj[i].EUR ? '<b>&euro;</b>' : '') +
	                '</span>' +
	                '<span>' +
	                  (bankObj[i].USD ? '<b>$</b>' : '') +
	                '</span>' +
	                '<span>' +
	                  (bankObj[i].RUB ? '<b>R</b>' : '') +
	                '</span>' +
	            '</td>' +
	            '<td>' +
	            	this.generate(bankObj[i], 'rateBuy', 'rateBuyDelta') +
	            '</td>' +
	            '<td>' +
	            	this.generate(bankObj[i], 'rateSale', 'rateSaleDelta') +
	            '</td>' +
	        '</tr>';
  };

  var currencyHTML = '<table class="-new-currensy">' +
                          '<tr>' +
                            '<th>' +
                              '<span>Банк</span>' +
                            '</th>' +
                            '<th>' +
                              '<span style="font-size: 18px">&#402;</span>' +
                            '</th>' +
                            '<th>' +
                              '<span>Покупка</span>' +
                            '</th>' +
                            '<th>' +
                              '<span>Продажа</span>' +
                            '</th>' +
                          '</tr>' +
                            bank +
                        '</table>';  
	curWrap.insertAdjacentHTML('beforeEnd', currencyHTML);
};