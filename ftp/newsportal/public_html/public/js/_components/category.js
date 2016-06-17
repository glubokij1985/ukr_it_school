function Category(elem){
    if(!elem) return;

    var self = this;
    this.id = 1;
    this.status = true;
    this.handlerScroll();
};

Category.prototype = Object.create(App.prototype);
Category.prototype.constructor = Category;

Category.prototype.ajax = function(){    
    var self = this;
    var scrolled = window.pageYOffset,
        total = document.documentElement.offsetHeight,
        delta = total - scrolled;    
    if(self.status == true && delta < 1500 && self.id < 10){        
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
    window.addEventListener('scroll', this.ajax.bind(this));    
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