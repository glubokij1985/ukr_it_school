if(window.addEventListener) window.addEventListener('load', init);
else if(window.attachEvent) window.attachEvent('load', init);

function init(){
    form1.username.onchange = nameOnChange;
    form1.email.onchange = emailOnChange;
    form1.tel.onchange = telOnChange;
    form1.onsubmit = formOnSubmit;
};

function validate(elem, patt){
    var result = patt.test(elem.value);
    if(result === true){
        elem.classList.add('valid');
    } else {
        elem.classList.add('invalid');
    }
};

function nameOnChange(){
    var pattern = /[a-zA-Z]{2,10}/gi;
    validate(this, pattern);
};

function emailOnChange(){
    var pattern = /[a-zA-Z\.\_\d]{1,}@[a-zA-Z]{1,10}\.[a-zA-Z]{2,3}/gi;
    validate(this, pattern);
};

function telOnChange(){
    var pattern = /[0-9]{10}/;
    validate(this, pattern);
};

function formOnSubmit(event){
    for(var i = 0; i < form1.elements.length; i++){
        if(form1.elements[i].type == 'text'){
            form1.elements[i].classList.add('valid');
        }
    };

    var invalid = false;

    for(var i = 0; i < form1.elements.length; i++){
        var formElem = form1.elements[i];
        if(formElem.type == 'text' && formElem.onchange){
            formElem.onchange();
            if(formElem.classList.contains('invalid')){
                invalid = true;
            }
        }
    };
    if(invalid){
        alert("Допущены ошибки при заполнении формы.");
        event.preventDefault();
        return false;
    }
};