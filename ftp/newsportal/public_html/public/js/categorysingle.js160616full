function CategorySingle(elem){
	if(!elem) return;

    var self = this;
    this.sourceId = document.getElementById('val-count-and-id');
    this.offset = this.sourceId.getAttribute('data-count');
    this.id = this.sourceId.getAttribute('data-id');
    
    this.status = true;
    this.handlerScrollSingle();
    this.ajax();    
};

CategorySingle.prototype.ajax = function(){    
    var self = this;
    if(self.status == true){
        var xhr = new XMLHttpRequest();
        self.status = false;
        xhr.open('GET', '/site/GetCategoryByIdXhrOrNotId?id=' + self.id + '&offset=' + self.offset, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var xhrObject = JSON.parse(xhr.responseText),
                    news = JSON.parse(xhrObject.news);
                self.loadNewsSingle(xhrObject, news, self.offset, xhrObject.language);
            };
        };
        xhr.send();
    };
};

CategorySingle.prototype.handlerScrollSingle = function(){
    window.addEventListener('scroll', this.ajax.bind(this));
};

CategorySingle.prototype.loadNewsSingle = function(xhrObject, news, offset, lang){
    var self = this;
    var newsSingle = '';
	for(var i = 0; i < news.length; i++){
        newsSingle += '<a href="/site/news/' + news[i].id + '" class="val-block-gen-news">' +
                            '<div class="val-image-block-gen-news">' +
                                '<img src="/uploads/news/thumb/' + news[i].image + '">' +
                            '</div>' +
                            '<div class="val-description-block-gen-news">' +
                                '<span class="val-news-view">' + news[i].views + '</span>' +
                                '<span class="val-content-news-data">' + this.compareDate(news[i].date, lang) + '</span>' +
                                '<h3 class="val-content-news-title-small">' + news[i]['title_' + lang] + '</h3>' +
                            '</div>' +
                        '</a>';
    };
    var newsSingleBlock = document.getElementById('val-single-category');
    newsSingleBlock.insertAdjacentHTML('beforeEnd', newsSingle);

    self.offset = xhrObject.offset;
    self.status = true;
};

CategorySingle.prototype.today = function(){
    var date = new Date(),
        current = new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
    return current;
};

CategorySingle.prototype.getMounth = function(mounth, lang){            
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

CategorySingle.prototype.compareDate = function(date, lang){
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

window.addEventListener('DOMContentLoaded', function(){
    var newCategorySingle = new CategorySingle(document.getElementById('val-single-category'));
});