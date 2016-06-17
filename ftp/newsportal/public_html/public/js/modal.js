function Modal(){
    var self = this;
    this.loginBtn = document.querySelector('.-login');
    this.regBtn = document.querySelector('.-registration');
    this.redactBtn = document.querySelector('.-about');
    this.remembBtns = document.querySelectorAll('.-val-remember-pass');
    this.closeBtns = document.querySelectorAll('.val-close-modals');
    this.wrapModal = document.querySelector('.val-modal-login-reg-outer');    

    this.getElemByAttr('data-attr');
    this.loginBtn.addEventListener('click', this.openModal.bind(this));
    this.regBtn.addEventListener('click', this.openModal.bind(this));
    this.redactBtn.addEventListener('click', this.openModal.bind(this));
    for(var i = 0; i < this.remembBtns.length; i++){
        this.remembBtns[i].addEventListener('click', this.openModal.bind(this));
    };
    for(var i = 0; i < this.closeBtns.length; i++){
        this.closeBtns[i].addEventListener('click', this.closeModal.bind(this));
    };
};

Modal.prototype = Object.create(App.prototype);
Modal.prototype.constructor = Modal;

Modal.prototype.openModal = function(event){
	var self = this;
    var buttons = self.getElemByAttr('data-attr'),
        target = event && event.target || event.srcElement,
        targetAttr = target.getAttribute('data-attr'),
        targetModal = document.querySelector('.' + targetAttr),
        loginForm = document.getElementById('login'),
        remembForm = document.getElementById('remember');
    if(targetAttr){
        self.wrapModal.style.cssText += 'display: table;';
        targetModal.style.cssText += 'display: block;';
        setTimeout(function(){
            self.wrapModal.style.cssText += 'opacity: 1;';
            targetModal.style.cssText += 'opacity: 1;';
        }, 1);
    };
    for(var i = 0; i < self.remembBtns.length; i++){
        if(target == self.remembBtns[i]){
            if(getComputedStyle(remembForm).display == 'none'){
                loginForm.style.cssText += 'display: none; opacity: 0;';
                remembForm.style.cssText += 'display: block; opacity: 1;';
            } else {
                remembForm.style.cssText += 'display: none; opacity: 0;';
                loginForm.style.cssText += 'display: block; opacity: 1;';
            }            
        };
    };
};

Modal.prototype.closeModal = function(event){
	var self = this;
    var target = event && event.target || event.srcElement;
    if(target.classList.contains('val-close-modals')){
       	target.parentElement.style.cssText += 'opacity: 0;';
    	self.wrapModal.style.cssText += 'opacity: 0;';
    	setTimeout(function(){
            target.parentElement.style.cssText += 'display: none;';
            self.wrapModal.style.cssText += 'display: none;';
        }, 500);
    };        
};