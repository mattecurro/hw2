function responseAggiorna(response) {
    return response.json();
}


function onJSON_aggiornaRisultati(json) {
    const id_sondaggio = document.querySelector("input[name='id']").value;
    
    
    document.querySelector("#sec_dettagli").classList.add("hidden");
    document.querySelector("#sec_modifica").classList.add("hidden");

    document.querySelector("#sec_risultati").classList.remove("hidden");

    document.querySelector("#sec_risultati").innerHTML = "";



    document.querySelector("#dettagli").classList.remove("underlined");
    document.querySelector("#modifica").classList.remove("underlined");

    document.querySelector("#risultati").classList.add("underlined");


    const container = document.createElement("div");
    container.classList.add("vote_container");

    document.querySelector("#sec_risultati").appendChild(container);

    if(json.length == 0){
        const span = document.createElement("span");
        span.textContent = "Non ha ancora votato nessuno questo sondaggio!";
        container.appendChild(span);
    }
    else{
        for(content of json) {
            const mini_container = document.createElement("div");
            mini_container.classList.add("mini_container");

            
            const opzione = document.createElement("div");
            opzione.textContent = content[0].option + "";

            //barra che si riempie 

            const n_voti = document.createElement("em");
            n_voti.textContent = "Voti: "; 
            const n_voti_value = document.createElement("strong");
            n_voti_value.textContent = content[0].n_occ_voto + " ";


            const n_votanti = document.querySelector("input[name='n_vot']").value;

            const perc_voti = document.createElement("em");
            perc_voti.textContent = "Percentuale: "; 
            const perc_voti_value = document.createElement("strong"); 
            perc_voti_value.textContent = (100 * content[0].n_occ_voto / n_votanti);
            perc_voti_value.textContent = parseFloat(perc_voti_value.textContent).toFixed(2);
            perc_voti_value.textContent = perc_voti_value.textContent + "%  ";
            //container.appendChild(opzione);
            container.appendChild(mini_container);
            mini_container.appendChild(opzione);
            mini_container.appendChild(n_voti);
            mini_container.appendChild(n_voti_value);
            mini_container.appendChild(perc_voti);
            mini_container.appendChild(perc_voti_value);
        }

    }
    document.querySelector('#risultati').removeEventListener("click", aggiornaRisultati);

    document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);
    document.querySelector('#modifica').addEventListener("click", modifica);
    

}






function aggiornaRisultati(){
    //ho come info: INPUT "HIDDEN" id.sondaggio e la sessione 
    const id_sondaggio = document.querySelector("input[name='id']").value;
    fetch("get_results/"+id_sondaggio).then(responseAggiorna).then(onJSON_aggiornaRisultati);
}

aggiornaRisultati();

document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);





function onJSON_aggiornaDettagli(json) {
    //const id_sondaggio = document.querySelector("input[name='id']").value;
        
    document.querySelector("#sec_risultati").classList.add("hidden");
    document.querySelector("#sec_modifica").classList.add("hidden");

    
    document.querySelector("#sec_dettagli").classList.remove("hidden");


    document.querySelector("#sec_dettagli").innerHTML = "";



    document.querySelector("#risultati").classList.remove("underlined");
    document.querySelector("#modifica").classList.remove("underlined");
    

    document.querySelector("#dettagli").classList.add("underlined");


    const container = document.createElement("div");
    container.classList.add("vote_container");

    document.querySelector("#sec_dettagli").appendChild(container);
    
    if(json.opzioni.length == 0){
        const span = document.createElement("span");
        span.textContent = "Non ha ancora votato nessuno questo sondaggio!";
        container.appendChild(span);
    }
    else{ 
        for(content of json.opzioni){
            const mini_container = document.createElement("div");
            mini_container.classList.add("mini_container");
            container.appendChild(mini_container);


            const div_opzione = document.createElement("div");
            div_opzione.textContent = content.option;
            div_opzione.setAttribute('id', content.option);
            div_opzione.setAttribute('class', 'title');

            mini_container.appendChild(div_opzione);    
        }

        let i = 0;
        for(content of json.utenti){
            for(c of content){
                const username = document.createElement("div");
                username.textContent = c.username;
                username.setAttribute('class', 'subtitle')
                document.getElementById(c.option).appendChild(username);
                i++;
            }
        }
    }

    document.querySelector('#dettagli').removeEventListener("click", aggiornaDettagli);

    document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);
    document.querySelector('#modifica').addEventListener("click", modifica);
    
}



function aggiornaDettagli(){    
    const id_sondaggio = document.querySelector("input[name='id']").value;
    //Richiedo OPZIONI: partecipanti - opzione  
    fetch("get_details/"+id_sondaggio).then(responseAggiorna).then(onJSON_aggiornaDettagli);
}




document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);




function escapeJS(string){
    try {
		return string.replace(/['"`\\]/g,
		tag => ({
				"'":"\\\\'",
        '"':'\"',
        '`':"\\\\'"
	}[tag]));
	} catch (e) {
	console.error(e);
	}
}

function onJSON_modifica(json){
    document.querySelector("#sec_risultati").classList.add("hidden");
    document.querySelector("#sec_dettagli").classList.add("hidden");
    
    document.querySelector("#sec_modifica").classList.remove("hidden");
    
    document.querySelector("#sec_modifica").innerHTML = "";
    

    document.querySelector("#risultati").classList.remove("underlined");
    document.querySelector("#dettagli").classList.remove("underlined");
    
    document.querySelector("#modifica").classList.add("underlined");


    const div_sec_modifica = document.createElement("div");
    div_sec_modifica.id = "div_modifica";

    

    const form = document.createElement("form");
    form.setAttribute('name', 'update_pool');
    form.setAttribute('action', 'update_pool');
    form.setAttribute('method', 'get');


    const id_sondaggio = document.createElement("input");
    id_sondaggio.setAttribute('type', 'hidden');
    id_sondaggio.setAttribute('name', 'id_sondaggio');
    id_sondaggio.setAttribute('value', document.querySelector("input[name='id']").value);




    const h_1 = document.createElement("h3");
    h_1.textContent = "Descrizione";

    const textarea = document.createElement("textarea");
    textarea.setAttribute('name', 'descrizione');
    textarea.textContent = json.sondaggio[0].description;

    const h_2 = document.createElement("h3");
    h_2.textContent = "Orario";

    const input_orario = document.createElement("input");
    input_orario.setAttribute('type', 'time');
    input_orario.setAttribute('name', 'orario');
    input_orario.setAttribute('value', json.sondaggio[0].hour);
    
    const h_3 = document.createElement("h3");
    h_3.textContent = "Luogo";

    const input_luogo = document.createElement("input");
    input_luogo.setAttribute('type', 'text');
    input_luogo.setAttribute('name', 'luogo');
    input_luogo.setAttribute('value', json.sondaggio[0].place);
    


    const h_4 = document.createElement("h3");
    h_4.textContent = "Data dell'evento";


    const input_data = document.createElement("input");
    input_data.setAttribute('type', 'date');
    input_data.setAttribute('name', 'data');
    input_data.setAttribute('value', json.sondaggio[0].date_event);
    
    const h_5 = document.createElement("h3");
    h_5.textContent = "Categoria";

    const input_category = document.createElement("input");
    input_category.setAttribute('type', 'text');
    input_category.setAttribute('name', 'categoria');
    input_category.setAttribute('value', json.sondaggio[0].category);
    

    const div_status = document.createElement("div");
    div_status.id = "status";

    const input_status_running = document.createElement("input");
    input_status_running.setAttribute('type', 'radio');
    input_status_running.setAttribute('name', 'status');
    input_status_running.setAttribute('value', 'Running');

    const label_running = document.createElement("label");
    label_running.setAttribute('for', 'Running');
    label_running.textContent = "Running";


    const input_status_stopped = document.createElement("input");
    input_status_stopped.setAttribute('type', 'radio');
    input_status_stopped.setAttribute('name', 'status');
    input_status_stopped.setAttribute('value', 'Stopped');

    const label_stopped = document.createElement("label");
    label_stopped.setAttribute('for', 'Stopped');
    label_stopped.textContent = "Stopped";


    form.appendChild(h_1);
    form.appendChild(textarea);
    form.appendChild(h_2);
    form.appendChild(input_orario);
    form.appendChild(h_3);
    form.appendChild(input_luogo);
    form.appendChild(h_4);
    form.appendChild(input_data);
    form.appendChild(h_5);
    form.appendChild(input_category);
    
    form.appendChild(id_sondaggio);



    div_status.appendChild(input_status_running);
    div_status.appendChild(label_running);
    div_status.appendChild(input_status_stopped);
    div_status.appendChild(label_stopped);
    form.appendChild(div_status)
    let i = 0;
    const h = document.createElement("h3");
    h.textContent = "Opzioni";
    form.appendChild(h);
    for(opzione of json.opzioni)  {
        i++;
        const input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'opzione[]');
        input.setAttribute('value', opzione.option);
        form.appendChild(input);
    }
    
    div_sec_modifica.appendChild(form);
    document.querySelector("section").appendChild(div_sec_modifica);


    const div_scelta = document.createElement("div");
    div_scelta.classList.add("scelta");
    const input_image = document.createElement("input");
    input_image.setAttribute('type', 'image');
    input_image.setAttribute('src', '../resources/img/add.png');

    const input_image_delete = document.createElement("input")
    input_image_delete.setAttribute('type', 'image');
    input_image_delete.setAttribute('src', '../resources/img/delete.png');

    const form_delete = document.createElement("form");
    form_delete.setAttribute('name', 'delete_pool');
    form_delete.setAttribute('action', 'delete_pool');
    form_delete.setAttribute('method', 'get');

    div_sec_modifica.appendChild(form_delete);

    const id_sondaggio_2 = document.createElement("input");
    id_sondaggio_2.setAttribute('type', 'hidden');
    id_sondaggio_2.setAttribute('name', 'id_sondaggio');
    id_sondaggio_2.setAttribute('value', document.querySelector("input[name='id']").value);
 

    form_delete.appendChild(id_sondaggio_2);
    form_delete.appendChild(input_image_delete);


    div_scelta.appendChild(input_image);
    
    //form.appendChild(div_agg);
    form.appendChild(div_scelta);

    
    form.addEventListener("submit", controllo)


    document.querySelector('#modifica').removeEventListener("click", modifica);

    document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);
    document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);
}

function aggiungi_opzione(event) {
    const nuova_opzione = document.createElement("input");
    nuova_opzione.setAttribute('type', 'text');
    nuova_opzione.setAttribute('name', 'opzione[]');
    const container = document.querySelector(".scelta");

 
    container.classList.remove("hidden");
    container.append(nuova_opzione);    
}



function modifica(){
    const id_sondaggio = document.querySelector("input[name='id']").value;
    fetch("modify/"+id_sondaggio).then(responseAggiorna).then(onJSON_modifica);
}

document.querySelector('#modifica').addEventListener("click", modifica);

function controllo(event)   {
    const form = event.currentTarget;
    if(form.descrizione.value.length == 0 ||
        form.orario.value.length == 0 ||
        form.luogo.value.length == 0 ||
        form.data.value.length == 0 ||
        form.categoria.value.length == 0 ||
        (form.status[0].checked == false && form.status[1].checked == false)
    )
        {
        //avviso utente
        
        const errore = document.createElement('p'); 
        errore.textContent = 'Errore: riempire tutti i campi!'; 
        errore.classList.add("errore");
        form.appendChild(errore);
        event.preventDefault();
    }
    else{
        let timerInterval
        Swal.fire({
        title: 'Sondaggio Modificato con successo!',
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
 


function onJSON(json) {
	const section = document.querySelector('#modal-view section');
    for (commento of json)
    {
        //scrivo tutti i commenti già presenti
        //distinzione io, non io per motivi stilistici

		const container = document.createElement('div');
        
        const div_session = document.querySelector('#session_id');
        const div_session_user_id_not_logged = document.querySelector('#session_user_id_not_logged');
        
        let username;


        if(div_session.textContent != -1 ){
            username = div_session.textContent;
        }
        if(div_session_user_id_not_logged.textContent != -1){ 
            username = div_session_user_id_not_logged.textContent;
        }
        if(username == commento.user){
    	    container.className="io";
        }else{
            container.className="nonio";
        }
        const h1 = document.createElement('h1');
        h1.textContent = commento.username;
        
        const p = document.createElement('p');
        p.textContent = commento.text;


        container.appendChild(h1);
        container.appendChild(p);
        section.appendChild(container);
    }

    const container_input = document.createElement('div');
    container_input.className="scrivi";
    
    const textarea = document.createElement('textarea');
    
    
    textarea.className="scrivi_commento";
    textarea.setAttribute("placeholder", "Il mio commento");
    
    
    container_input.appendChild(textarea);
	
    
    const button = document.createElement('input');
    
    button.setAttribute("type", "button");
    button.setAttribute("name", "commenta")
    button.setAttribute("value", "Commenta");
    button.id = "inv";
  
    button.onclick = function(){
        const container_text = document.querySelector('.scrivi_commento');
        if( container_text.value !== ""){
            const testo_safe = escapeJS(container_text.value);
            const id_sondaggio = document.querySelector("input[name='id']").value;
            
            const div_session = document.querySelector('#session_id');
            const div_session_user_id_not_logged = document.querySelector('#session_user_id_not_logged');
        
            let username;


            if(div_session.textContent != -1 ){
                username = div_session.textContent;
            }
            if(div_session_user_id_not_logged.textContent != -1){ 
                username = div_session_user_id_not_logged.textContent;
            }   
            //fetch post, passo argomenti in json
            fetch("add_comment/"+id_sondaggio+"/"+testo_safe+"/"+username); 
        }
	    const millis=1000;
	    const date = new Date();
	    let curDate = null;
	    do {
		    curDate = new Date();
	    }while(curDate-date < millis);
	    modalView.innerHTML = '';
        const container = document.createElement('div');
        container.className="chiudi";
        
        const img_close = document.createElement('img');
        img_close.src="../resources/img/close.png";
        //reimposto funzionamento al click della close
        //CHIUDERE LA MODALE
        img_close.onclick = function() {
        document.body.classList.remove('no-scroll');
        modalView.classList.add('hidden');
        modalView.innerHTML = '';
        };
        container.appendChild(img_close);
        modalView.appendChild(container);
        modalView.classList.remove('hidden');
        const section_conversazione = document.createElement('section');
        section_conversazione.className="conversazione";
        modalView.appendChild(section_conversazione);
        const id_sondaggio = document.querySelector("input[name='id']").value;
        fetch("get_comments/"+id_sondaggio).then(onResponse).then(onJSON);
    };
   

    container_input.appendChild(button);
    
    modalView.appendChild(container_input);
} 

  
function onResponse(response) {
    return response.json();
} 


function onThumbnailclick(){
    const id_sondaggio = document.querySelector("input[name='id']").value;

    
    
//devo aver già votato, sono nel post_vote    

    document.body.classList.add('no-scroll');
    //scostamento verticale della viewport rispetto a inizio pagina
    //style == impostazione di proprietà CSS in js
    modalView.style.top = window.pageYOffset + 'px';
    const container = document.createElement('div');
    container.className="chiudi";
    const img_close = document.createElement('img');
    img_close.src="../resources/img/close.png";
    //reimposto funzionamento al click della close
    img_close.onclick = function() {
        document.body.classList.remove('no-scroll');
        modalView.classList.add('hidden');
        modalView.innerHTML = '';
    };
    container.appendChild(img_close);
    modalView.appendChild(container);
    modalView.classList.remove('hidden');
    const section_conversazione = document.createElement('section');
    section_conversazione.className="conversazione";
    modalView.appendChild(section_conversazione);
    fetch("get_comments/"+id_sondaggio).then(onResponse).then(onJSON);
}

    

function aggiungi_evento()
{
let box = document.querySelector('#chat img');
box.addEventListener('click', onThumbnailclick);

}


const modalView = document.querySelector('#modal-view');
aggiungi_evento();
