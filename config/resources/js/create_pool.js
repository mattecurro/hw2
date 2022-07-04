function aggiungi_opzione(event) {
    const nuova_opzione = document.createElement("input");
    nuova_opzione.setAttribute('type', 'text');
    nuova_opzione.setAttribute('name', 'opzione[]');
    const container = document.querySelector("form div");

 
    container.classList.remove("hidden");
    container.append(nuova_opzione);    
}

document.querySelector("input[type=button]").addEventListener("click",aggiungi_opzione);



function controllo(event)   {
    const form = event.currentTarget;
    if(form.descrizione.value.length == 0 ||
        form.orario.value.length == 0 ||
        form.luogo.value.length == 0 ||
        form.data.value.length == 0 ||
        form.categoria.value.length == 0)
    {
        //avviso utente
        
        //div.classList.add('Errore');
        const errore = document.createElement('p');
        errore.classList.add('Errore'); 
        errore.textContent = 'Errore: riempire tutti i campi!'; 
        form.appendChild(errore);
        event.preventDefault();
    }
    else{
        let timerInterval
        Swal.fire({
        title: 'Sondaggio Creato con successo!',
        timer: 2000,
        didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
}   ).then((result) => {
  /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
    }
    })
    
    }
}

document.querySelector('form[name="login"]').addEventListener("submit", controllo);

