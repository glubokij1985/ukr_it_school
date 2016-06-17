function FixedAccord(elem){
    if(!elem) return;

    var self = this;

    this.handlerScrollFixed();
};

FixedAccord.prototype = Object.create(App.prototype);
FixedAccord.prototype.constructor = FixedAccord;

FixedAccord.prototype.scrollAccord = function(){
    var accord = document.getElementById('val-only-else-pages'),
        accordWidth = accord.clientWidth,
        accordUl = document.querySelector('#val-only-else-pages .val-list-accard'),
        curScroll = window.pageYOffset,
        accordTop = accord.getBoundingClientRect().top + curScroll,
        blog = document.querySelector('.val-blogers-column'),
        blogBottom = blog.getBoundingClientRect().bottom + blog.clientHeight;
    if(curScroll > accordTop){
        accordUl.style.cssText += 'position: fixed;top: 0;width: ' + accordWidth + 'px;';
   } else {
        accordUl.style.cssText += 'position: static;top: auto;width: auto;'; 
   };
};

FixedAccord.prototype.handlerScrollFixed = function(){
    window.addEventListener('scroll', this.scrollAccord.bind(this));
};