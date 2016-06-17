function App() {
    this.init();
}

App.prototype = Object.create(Helper.prototype);
App.prototype.constructor = App;

App.prototype.init = function () {
    new Weather(document.querySelector('.outer-for-weather'));
    new SliderConstructor(document.querySelector('.val-list-slider'), document.querySelector('.val-display-controls'));
    // new Iframe(document.querySelector('.val-iframe-streams'));
    new Currency(document.querySelector('.-with-before.-currency-val'));
    new ModalFrame(document.querySelector('.val-header-outer-block'), document.querySelector('.val-cell-modal-outer'));
    new Category(document.querySelector('.val-full-width-category'));
    new CategorySingle(document.querySelector('#val-single-category'),document.querySelector('.val-accordeons-block'));
};

window.addEventListener('DOMContentLoaded', function () {
    new App();
});