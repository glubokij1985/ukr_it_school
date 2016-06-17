function SliderConstructor(elem, pag) {
    this.element = elem;
    this.pag = pag;
    this.construct();
    this.handler();
    this.current = 0;
}

SliderConstructor.prototype = Object.create(App.prototype);
SliderConstructor.prototype.constructor = SliderConstructor;

SliderConstructor.prototype.construct = function () {
    this.width = parseInt(getComputedStyle(this.element.firstElementChild).getPropertyValue('width'));
    var list = this.element.children,
        pagination = '';

    this.element.style.width = this.width * list.length + 5 + 'px';

    for (var i = 0; i < list.length; i++) {
        list[i].setAttribute('data-slide', i);
        pagination += '<span data-control="' + i + '"></span>';
    }
    this.pag.insertAdjacentHTML('afterBegin', pagination);

    this.pag.firstElementChild.classList.add('-active-slide');
};

SliderConstructor.prototype.handler = function () {
    this.pag.addEventListener('click', this.move.bind(this));
};

SliderConstructor.prototype.move = function (event) {
    var target = event.target,
        attr = target.getAttribute('data-control'),
        pos = attr * this.width,
        pagList = this.pag.children;

    if (target.hasAttribute('data-control')) {
        this.element.style.cssText += 'transition: .5s; transform: translateX(' + -pos + 'px);';

        this.current = attr;

        for (var i = 0; i < pagList.length; i++) {
            pagList[i].classList.remove('-active-slide')
        }

        pagList[attr].classList.add('-active-slide');
    }
};