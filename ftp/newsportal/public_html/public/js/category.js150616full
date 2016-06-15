function Category(){
    var self = this;
    this.id = 1;
    this.status = true;
    this.handlerScroll();
};

Category.prototype.ajax = function(){    
    var self = this;
    var scrollCurrent = window.pageYOffset + document.documentElement.clientHeight,
        offsetNewsBlock = window.pageYOffset + document.querySelector('.val-full-width-category').getBoundingClientRect().top;
    if(self.status == true && scrollCurrent > offsetNewsBlock){        
        var xhr = new XMLHttpRequest();
        self.status = false;
        xhr.open('GET', '/site/GetCategory?id=' + self.id, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var xhrObject = JSON.parse(xhr.responseText),
                    category = JSON.parse(xhrObject.category),
                    news = JSON.parse(xhrObject.news);
                self.loadNews(category, news, xhrObject.language);            
            };
        };
        xhr.send();
    };
};

Category.prototype.handlerScroll = function(){
    if(document.querySelector('.val-full-width-category')){
        window.addEventListener('scroll', this.ajax.bind(this));
    };        
};

Category.prototype.loadNews = function(cat, news, lang){
    var self = this;
    var newsWithImg = '',
        newsWithoutImg = '';
    newsWithImg += '<a href="/site/news/' + news[0].id + '" class="val-news-item-category val-category-image">' +
                        '<div class="val-item-outer-category-image">' +
                            '<img src="/uploads/news/thumb/' + news[0].image + '" alt="' + news[0]['title_' + lang] + '">' +
                        '</div>' +
                        '<div class="val-line-vews-data">' +
                            '<span class="val-content-news-data">' + this.compareDate(news[0].date, lang) + '</span>' +
                            '<span class="val-news-view">' + news[0].views + '</span>' +
                        '</div>' +
                        '<h2 class="val-title-news-category">' + news[0]['title_' + lang] + '</h2>' +
                    '</a>';
    for(var i = 1; i < news.length; i++){
        newsWithoutImg += '<a href="/site/news/' + news[i].id +'" class="val-news-item-category val-category-image">' +
                                '<div class="val-line-vews-data">' +
                                    '<span class="val-content-news-data">' + this.compareDate(news[i].date, lang) + '</span>' +
                                    '<span class="val-news-view">' + news[i].views + '</span>' +
                                '</div>' +
                                '<h2 class="val-title-news-category">' + news[i]['title_' + lang] + '</h2>' +
                                '<p class="val-description-news-category">' + news[i]['description_' + lang].slice(0, 247) + '...' + '</p>' +
                            '</a>';        
    };
    var newsBlock = document.querySelector('.val-full-width-category'),        
        catHtml = '<div class="val-category-block">' +
                    '<h2 class="val-title-uppercase-with-line">' + cat[0]['name_' + lang] + '</h2>' +
                    '<div class="val-news-list-category">' +        
                        newsWithImg +
                        newsWithoutImg +
                    '</div>' +
                '</div>';
    newsBlock.insertAdjacentHTML('beforeEnd', catHtml);
    self.status = true;
    self.id++;
};

Category.prototype.today = function(){
    var date = new Date(),
        current = new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();
    return current;
};

Category.prototype.getMounth = function(mounth, lang){            
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

Category.prototype.compareDate = function(date, lang){
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
    var newCategory = new Category();
});