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

CategorySingle.prototype = Object.create(App.prototype);
CategorySingle.prototype.constructor = CategorySingle;

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