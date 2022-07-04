function checkName(event) {
    const input = event.currentTarget;
    const div = document.querySelector('form div.campo');
       
    if(input.value == ""){
        div.innerHTML = '';
        div.classList.add('Errore');
        const errore = document.createElement('p'); 
        errore.textContent = 'Errore: riempire il campo '+input.name ; 
        div.appendChild(errore);
        scores.name = 0;
        checkSubmit();
        return false;
        }
    else{
        if(div.classList.contains('Errore')){
            div.classList.remove('Errore');
            div.innerHTML = '';
        }
    }
    scores.name = 1;
    checkSubmit();
}

function checkSurname(event){
    const input = event.currentTarget;
    const div = document.querySelector('form div.surname');
    
    if(input.value == ""){
        div.innerHTML = '';
        div.classList.add('Errore');
        const errore = document.createElement('p'); 
        errore.textContent = 'Errore: riempire il campo '+input.name ; 
        div.appendChild(errore);
        scores.surname = 0;
        checkSubmit();
        return false;
    }
    else{
        if(div.classList.contains('Errore')){
            div.classList.remove('Errore');
            div.innerHTML = '';
        }
    }
    scores.surname = 1;
    checkSubmit();
}

    

function checkUsername(event) {    
    const input = event.currentTarget;
    const div = document.querySelector('form div.username');
    if(input.value == ""){
        div.innerHTML = '';
        div.classList.add('Errore');
        const errore = document.createElement('p'); 
        errore.textContent = 'Errore: riempire il campo '+input.name ; 
        div.appendChild(errore);
        scores.username = 0;
        checkSubmit();
        return false;
    }
    else{
        if(div.classList.contains('Errore')){
            div.classList.remove('Errore');
            div.innerHTML = '';
        }
    
    }
    if(!/^[a-zA-Z0-9_]{1,15}$/.test(input.value)){
        div.innerHTML = '';
        div.classList.add('Errore');
        const errore = document.createElement('p');
        errore.textContent = 'Username non disponibile. Sono ammesse lettere, numeri e underscore. Inserire max 15 caratteri.';
        div.appendChild(errore);
        scores.username = 0;
        checkSubmit();
        return false;
    }
    else{
        if(div.classList.contains('Errore')){
            div.classList.remove('Errore');
            div.innerHTML = '';
        }
        fetch('register/username/'+encodeURIComponent(input.value)).then(onResponse).then(jsonCheckUsername);
    }
    scores.username = 1;
    checkSubmit();
}
    



function jsonCheckUsername(json) {
    const div = document.querySelector('form div.username');
    if(json === 1){
        div.innerHTML = '';
        div.classList.add('Errore');
        const errore = document.createElement('p'); 
        errore.textContent = 'Username già utilizzato'; 
        div.appendChild(errore);
        scores.username = 0;
        checkSubmit();
        return false;
    }
    else{
        if(div.classList.contains('Errore')){
        div.classList.remove('Errore');
        div.innerHTML = '';
        }
    }
    scores.username = 1;
    checkSubmit();
}


function checkPassword(event) {
    const input = event.currentTarget;
    const div = document.querySelector('form div.password');
    if (input.value.length >= 5) {
        if(div.classList.contains('Errore')){
            div.classList.remove('Errore');
            div.innerHTML = '';
        }
        scores.password = 1;
        checkSubmit();        
    } else {
        div.innerHTML = '';
        div.classList.add('Errore');
        const errore = document.createElement('p');
        errore.textContent = 'Password debole, inserire almeno 5 caratteri';
        div.appendChild(errore);
        scores.password = 0;
        checkSubmit();
        return false;
    }
}

function checkConfirmPassword(event) {
    const input = event.currentTarget;
    const div = document.querySelector('form div.conferma_password');
    if(input.value !== document.querySelector('#password').value){
        div.innerHTML = '';
        div.classList.add('Errore');
        const errore = document.createElement('p');
        errore.textContent = 'Errore: Le password non coincidono.'; 
        div.appendChild(errore);
        scores.conferma_password = 0;
        checkSubmit();
        return false;
    }    
    else{
        if(div.classList.contains('Errore')){
            div.classList.remove('Errore');
            div.innerHTML = '';
        }
    }
    scores.conferma_password = 1;
    checkSubmit();
}

function checkSubmit(){
    let cont = 0;
    for(let elem in scores){
        if(scores[elem] === 1){
            cont++;
        }
    }
    if(cont === 5){        
        const ciao = document.querySelector('#username').value;
        return true;
    }
    else{
        return false;
    }
}

function Submit(event){
    if(!checkSubmit()){       
        event.preventDefault();
    }
}


function onResponse(response) {
    return response.json();
} 


document.querySelector('#name').addEventListener('blur', checkName);
document.querySelector('#surname').addEventListener('blur', checkSurname);
document.querySelector('#username').addEventListener('blur', checkUsername);
document.querySelector('#password').addEventListener('blur', checkPassword);
document.querySelector('#confirm_password').addEventListener('blur', checkConfirmPassword);


const scores = {
    name: 0,
    surname: 0,
    username: 0,
    password: 0,
    confirm_password: 0
};

const form = document.querySelector('form');
form.addEventListener('submit', Submit);
