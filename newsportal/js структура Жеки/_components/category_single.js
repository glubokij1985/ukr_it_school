function CategorySingle(elem, accord) {
    if (!elem) return;
    this.wrap = elem;
    this.accord = accord;
    this.lengthToAccord = this.accord.getBoundingClientRect().top;
    this.input = document.querySelector('#val-count-and-id');
    this.id = this.input.getAttribute('data-id');
    this.offset = this.input.getAttribute('data-count');
    this.getAjax();
    this.handler();
}

CategorySingle.prototype = Object.create(App.prototype);
CategorySingle.prototype.constructor = CategorySingle;

CategorySingle.prototype.getAjax = function () {
    this.status = false;
    this.xhrRequest('http://' + location.hostname + '/site/GetCategoryByIdXhrOrNotId?id=' + this.id + '&offset=' + this.offset, this.succes.bind(this));
};

CategorySingle.prototype.handler = function () {
    window.addEventListener('scroll', this.checkOffset.bind(this));
};

CategorySingle.prototype.templateConstruct = function (elem, lang) {
    return '<a href="/site/news/' + elem.id + '" class="val-block-gen-news">' +
                '<div class="val-image-block-gen-news">' +
                    '<img src="/uploads/news/thumb/' + elem.image + '">' +
                '</div>' +
                '<div class="val-description-block-gen-news">' +
                    '<span class="val-news-view">' + elem.views + '</span>' +
                    '<span class="val-content-news-data">' + elem.date + '</span>' +
                    '<h3 class="val-content-news-title-small">' + elem["title_" + lang] + '</h3>' +
                '</div>' +
            '</a>';
};

CategorySingle.prototype.checkOffset = function () {
    var scrolled = window.pageYOffset,
        total = document.documentElement.offsetHeight,
        delta = total - scrolled;

    if( delta < 2200 && this.status == true) {
        this.getAjax();
    }

    if ( this.accord.getBoundingClientRect().top < 30) {
        this.accord.children[0].style.cssText += 'position:fixed;top:0;width: 300px;';
    } else {
        this.accord.children[0].style.cssText += 'position:static;top:auto;';
    }
};

CategorySingle.prototype.succes = function (data) {
    var obj = JSON.parse(data),
        news = JSON.parse(obj.news),
        lang = obj.language,
        template = '';

    for( var i = 0; i<news.length; i++){
        template += this.templateConstruct(news[i], lang);
    }
    this.wrap.insertAdjacentHTML('beforeEnd', template);
    this.offset = obj.offset;

    this.status = true;
};