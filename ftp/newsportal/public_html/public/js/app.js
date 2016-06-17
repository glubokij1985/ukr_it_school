function App(){
	this.init();
};

App.prototype = Object.create(Helper.prototype);
App.prototype.constructor = App;

App.prototype.init = function(){
	new Category(document.querySelector('.val-full-width-category'));
	new CategorySingle(document.getElementById('val-single-category'));
	new Currency();
	new FixedAccord(document.getElementById('val-only-else-pages'));
	new Iframe(document.querySelector('.val-iframe-streams'));
    new Modal();
    new Slider(document.querySelector('.val-slider-general-news'));
    new Weather();
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
});