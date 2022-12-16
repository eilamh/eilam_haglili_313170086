
// ==================================active nav bar==============================================

var activePage = window.location.pathname;
console.log(activePage);

const activeNav = document.querySelectorAll('nav a').forEach( link =>{
    if (link.href.includes(`${activePage}`)) {
        link.classList.add("active");
    }
}

);

// ==================================welcome effect==============================================

const animateText = (element) => {
    if (!element) {
        console.warn('Tring to animate non existing element')
        return
    }
    const strText = element.textContent;
    const splitText = strText.split("");
    element.textContent ="";
    for(let i=0; i < splitText.length; i++){
        element.innerHTML += "<span>" + splitText[i] + "</span>";
    }
    
    let char=0;
    let timer = setInterval(onTick,50);
    
    function onTick(){
        const span = element.querySelectorAll('span')[char];
        span.classList.add('fade');
        char++
        if(char== splitText.length){
            complete();
            return;
        }
    }
    
    function complete(){
        clearInterval(timer);
        timer=null;
    };    
}

const textElement = document.querySelector(".welcome1");

if (textElement) {
    animateText(textElement)
}

// =====================================validation==================================================//

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();

    const emailValue = email != null ?  email.value.trim() : '';
    
    const passwordValue = password.value.trim();

    const password2Value = password2 != null ?  password2.value.trim() : '';
    

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if (email != null)
        if(emailValue === '') {
            setError(email, 'Email is required');
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
        } else {
            setSuccess(email);
        }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 6 ) {
        setError(password, 'Password must be at least 6 character.')
    } else {
        setSuccess(password);
    }

    if (password2 != null)
        if(password2Value === '' && password2Value != null) {
            setError(password2, 'Please confirm your password');
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords doesn't match");
        } else {
            setSuccess(password2);
        }
};



