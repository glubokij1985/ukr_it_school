function Category(elem) {
    if (!elem) return;
    this.wrap = elem;
    this.id = 1;
    this.getAjax();
    this.handler();
}

Category.prototype = Object.create(App.prototype);
Category.prototype.constructor = Category;

Category.prototype.getAjax = function () {
    this.status = false;
    this.xhrRequest('http://' + location.hostname + '/site/GetCategory?id=' + this.id, this.succes.bind(this));
};

Category.prototype.handler = function () {
    window.addEventListener('scroll', this.checkOffset.bind(this));
};

Category.prototype.checkOffset = function () {
    var scrolled = window.pageYOffset,
        total = document.documentElement.offsetHeight,
        delta = total - scrolled;

    if( delta < 1500 && this.id < 9 && this.status == true) {
        this.id += 1;
        if ( this.id == 7) return;
        this.getAjax();
    }
};

Category.prototype.succes = function (data) {
    var obj = JSON.parse(data),
        news = JSON.parse(obj.news),
        category = JSON.parse(obj.category),
        lang = obj.language,
        template = '<div class="val-category-block">' +
                    '<h2 class="val-title-uppercase-with-line">' + category[0]["name_" + lang] + '</h2>' +
                        '<div class="val-news-list-category">' +
                            '<a href="/site/news/' + news[0].id + '" class="val-news-item-category val-category-image">' +
                                '<div class="val-item-outer-category-image">' +
                                    '<img src="/uploads/news/thumb/' + news[0].image + '" alt="' + news[0]["title_" + lang] + '">' +
                                '</div>' +
                                '<div class="val-line-vews-data">' +
                                    '<span class="val-content-news-data">' + news[0].date + '</span>' +
                                    '<span class="val-news-view">' + news[0].views + '</span>' +
                                '</div>' +
                                '<h2 class="val-title-news-category">' + news[0]["title_" + lang] + '</h2>' +
                            '</a>' +
                            '<a href="/site/news/' + news[1].id + '" class="val-news-item-category">' +
                                '<div class="val-line-vews-data">' +
                                    '<span class="val-content-news-data">' + news[1].date + '</span>' +
                                    '<span class="val-news-view">' + news[1].views + '</span>' +
                                '</div>' +
                                '<h2 class="val-title-news-category">' + news[1]["title_" + lang] + '</h2>' +
                                '<p class="val-description-news-category">' + news[1]["description_" + lang].slice(0, 250-3) + '...</p>' +
                            '</a>' +
                            '<a href="/site/news/' + news[2].id + '" class="val-news-item-category">' +
                                '<div class="val-line-vews-data">' +
                                    '<span class="val-content-news-data">' + news[2].date + '</span>' +
                                    '<span class="val-news-view">' + news[2].views + '</span>' +
                                '</div>' +
                                '<h2 class="val-title-news-category">' + news[2]["title_" + lang] + '</h2>' +
                                '<p class="val-description-news-category">' + news[2]["description_" + lang].slice(0, 250-3) + '...</p>' +
                            '</a>' +
                        '</div>' +
                '</div>';

    this.wrap.insertAdjacentHTML('beforeEnd', template);
    
    this.status = true;
};
