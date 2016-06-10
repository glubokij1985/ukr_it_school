function Iframe(elem){
    if(!elem) return;

    var src = elem.getAttribute('data-src'),                
        arrSrc = src.split(','),
        str = '';

    for(var i = 0; i < arrSrc.length; i++){
        str += this.template(arrSrc[i]);
    };

    elem.insertAdjacentHTML('beforeEnd', str);
};

Iframe.prototype.template = function(srcLink){
    var temp = '<div class="val-outer-frame">' + 
                    '<span class="val-ico-online">' + 
                        '<i>Online iframe</i>' + 
                    '</span>' + 
                    '<iframe src="' + srcLink + '"></iframe>' + 
                '</div>';
    return temp;
};

window.addEventListener('DOMContentLoaded', function(){
    var newIframe = new Iframe(document.querySelector('.val-iframe-streams'));
});