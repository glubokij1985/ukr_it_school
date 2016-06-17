function ModalFrame (wrapButtons, wrapModals) {
    this.wrapButtons = wrapButtons;
    this.wrapModals = wrapModals;
    this.addEvents();
}

ModalFrame.prototype = Object.create(App.prototype);
ModalFrame.prototype.constructor = ModalFrame;

ModalFrame.prototype.addEvents = function () {
    this.wrapButtons.addEventListener('click', this.show);
    this.wrapModals.addEventListener('click' , this.inModal);
};

ModalFrame.prototype.show = function (event) {
    var target = event.target,
        attr = target.getAttribute('data-attr'),
        modal = document.querySelector('.' + attr);
    
    if (target.hasAttribute('data-attr')){
        modal.parentElement.parentElement.style.cssText += 'display:block;';
        modal.style.cssText += 'display:block;';

        setTimeout(function() {
            modal.parentElement.parentElement.style.cssText += 'opacity:1;transition:.5s';
            modal.style.cssText += 'opacity:1;transition:.5s';
        }, 100);
        event.preventDefault();
    }
};

ModalFrame.prototype.inModal = function (event) {
    var target = event.target,
        formLogin = document.querySelector('#login'),
        remember = document.querySelector('#remember');

    if (target.classList.contains('val-close-modals')) {
        target.parentElement.parentElement.parentElement.style.cssText += 'opacity:0;transition:.5s;';
        target.parentElement.style.cssText += 'opacity:0;transition:.5s;';

        setTimeout(function() {
            target.parentElement.parentElement.parentElement.style.cssText += 'display:none;';
            target.parentElement.style.cssText += 'display:none;';

            if(getComputedStyle(formLogin).getPropertyValue('display') == 'none') {
                formLogin.style.display = 'block';
                remember.style.display = 'none';
            }
        }, 500);
    } else if (target.classList.contains('-val-remember-pass')) {

        if (getComputedStyle(remember).getPropertyValue('display') == 'none') {
            remember.style.display = 'block';
            formLogin.style.display = 'none';
        } else {
            remember.style.display = 'none';
            formLogin.style.display = 'block';
        }
        event.preventDefault();
    }
};
