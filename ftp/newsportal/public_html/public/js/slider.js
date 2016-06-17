function Slider(elem){
	if(!elem) return;

	var self = this;

	this.arrLi = document.querySelectorAll('.val-list-slider li');
	this.liWidth = this.arrLi[0].clientWidth;
	this.liCount = this.arrLi.length;  
	this.pagin = document.querySelector('.val-display-controls');    		
	this.ul = document.querySelector('.val-list-slider');
	this.ulWidth = this.liCount * this.liWidth;
	var str = '';

	for(var i = 0; i < this.liCount; i++){
		this.arrLi[i].setAttribute('data-slide', i);
		str += this.setDataContr(this.arrLi[i].getAttribute('data-slide'));
	};

	this.pagin.insertAdjacentHTML('afterBegin', str);
	this.paginBtn = document.querySelectorAll('.val-display-controls span'); 
	this.paginBtn[0].classList.add('-active-slide');
	this.paginBtnActive = document.querySelector('.val-display-controls span.-active-slide');
	this.paginBtnActiveAttr = this.paginBtnActive.getAttribute('data-controls');
	this.createStyle('width', this.ulWidth, this.ul);
	this.pagin.addEventListener('click', this.moveSlide.bind(this));
};

Slider.prototype = Object.create(App.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.moveSlide = function(event){
	var self = this;
	var target = event && event.target || event.srcElement,
		targetDataAttr = target.getAttribute('data-controls'),
		deltaX = 0;

	if(targetDataAttr > self.paginBtnActiveAttr){
		deltaX = -targetDataAttr * self.liWidth;
	} else {
		deltaX = targetDataAttr * self.liWidth;
	};
	self.ul.style.transform = 'translateX(' + deltaX + 'px)';
	self.paginBtnActive.classList.remove('-active-slide');
	target.classList.add('-active-slide');
	self.paginBtnActive = document.querySelector('.val-display-controls span.-active-slide');
};

Slider.prototype.setDataContr = function(dataAttr){
	var paginator = '<span data-controls="' + dataAttr + '"></span>';
	this.arrLi[0].classList.add('-active-slide');
	return paginator;
};

Slider.prototype.createStyle = function(prop, val, el){
	el.style.cssText += prop + ':' + val + 'px';
};