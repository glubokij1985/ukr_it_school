function Iframe(el) {
    if (el) {
        this.frameConstruct(el);
    }
}

Iframe.prototype = Object.create(App.prototype);
Iframe.prototype.constructor = Iframe;

Iframe.prototype.frameConstruct = function (elem) {
    var data = elem.getAttribute('data-src'),
        srcArray = data.split(','),
        string = '';

    for (var i = 0; i < srcArray.length; i++) {
        string += this.srcConstruct(srcArray[i])
    }

    elem.insertAdjacentHTML('beforeEnd', string)
};

Iframe.prototype.srcConstruct = function (src) {
    return  '<div class="val-outer-frame">' +
        '<span class="val-ico-online">' +
        '<i>Online</i>' +
        '</span>' +
        '<iframe src="' + src + '" frameborder="0"></iframe>' +
        '</div>';
};
