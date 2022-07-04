function onJSON_aggiornaOpzioni(json) {

    document.querySelector("#sec_risultati").classList.add("hidden");
    
    document.querySelector("#sec_dettagli").classList.add("hidden");

    document.querySelector("#sec_registra_voto").classList.remove("hidden");

    document.querySelector("#sec_registra_voto").innerHTML = "";


    document.querySelector("#risultati").classList.remove("underlined");
    document.querySelector("#dettagli").classList.remove("underlined");
    
    document.querySelector("#registra_voto").classList.add("underlined");



    const form = document.createElement("form");
    form.setAttribute('name', 'scelta');
    form.setAttribute('action', 'add_vote');
    form.setAttribute('method', 'GET');

    
    for(opzione of json)  {
        const input = document.createElement("input");
        input.setAttribute('type', 'submit');
        input.setAttribute('name', 'scelta');
        input.setAttribute('value', opzione.option);
        input.setAttribute('value1', opzione.id);
        input.setAttribute('value2', opzione.pool);
        document.querySelector("section").appendChild(form);
        form.appendChild(input);
    }
    const container = document.createElement("div");
    container.classList.add("vote_container");


    const div_session = document.querySelector('#session_id');
    const div_session_user_id_not_logged = document.querySelector('#session_user_id_not_logged');

//da loggato non si fa questa parte
//////////////////////////////////////////
    
    if(div_session.textContent == -1 & div_session_user_id_not_logged.textContent == -1){
        const descrizione = document.createElement("div");
        descrizione.textContent = "Il tuo nome";
        const username = document.createElement("input");
        username.setAttribute('type', 'text');
        username.setAttribute('name', 'username');
        container.appendChild(descrizione);
        //username = escapeJS(username.value); 
        container.appendChild(username);
        form.appendChild(container);
    }
 

    document.querySelector("form").addEventListener("submit", controllo);
 

    document.querySelector('#registra_voto').removeEventListener("click", aggiornaOpzioni);
 
    document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);
    document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);
 
}



function responseAggiorna(response) {
    return response.json();
}

function aggiornaOpzioni() {
   //miglioramento della get_options, nella versione precedente caricavo tutti i sondaggi, sfrutto la conoscenza del valore dell'id_sondaggio
   const id_sondaggio = document.querySelector("input[name='id']").value;
   fetch("get_options/"+id_sondaggio).then(responseAggiorna).then(onJSON_aggiornaOpzioni);
}

//carico opzioni del sondaggio cliccato
aggiornaOpzioni();

document.querySelector('#registra_voto').addEventListener("click", aggiornaOpzioni);


function controllo(event)   {
    const form = event.currentTarget;
//    const input = event.currentTarget;
//  const form = document.querySelector("form[name='scelta']");

    if(typeof form.username === 'undefined' || form.username.value.length !== 0){
        const input_hidden_voto = document.createElement("input");
        input_hidden_voto.setAttribute('type', 'hidden');
        input_hidden_voto.setAttribute('name', 'voto');
        input_hidden_voto.setAttribute('value', event.submitter.attributes[3].nodeValue);
        const input_hidden_id_sondaggio = document.createElement("input");
        input_hidden_id_sondaggio.setAttribute('type', 'hidden');
        input_hidden_id_sondaggio.setAttribute('name', 'id_sondaggio');
        input_hidden_id_sondaggio.setAttribute('value', event.submitter.attributes[4].nodeValue);            

        form.appendChild(input_hidden_voto);
        form.appendChild(input_hidden_id_sondaggio);       
    }
    else{
        if(form.username.value.length == 0) {
        const errore = document.createElement("p");
        errore.classList.add("errore");
        errore.textContent = "Inserisci un nome utente per votare!";
        form.appendChild(errore);    
        event.preventDefault();
        }
    }

    
}



function onJSON_aggiornaRisultati(json) {
    const id_sondaggio = document.querySelector("input[name='id']").value;
    
    document.querySelector("#sec_registra_voto").classList.add("hidden");
    
    document.querySelector("#sec_dettagli").classList.add("hidden");

    document.querySelector("#sec_risultati").classList.remove("hidden");

    document.querySelector("#sec_risultati").innerHTML = "";



    document.querySelector("#registra_voto").classList.remove("underlined");
    document.querySelector("#dettagli").classList.remove("underlined");
    
    document.querySelector("#risultati").classList.add("underlined");


    const container = document.createElement("div");
    container.classList.add("vote_container");

    document.querySelector("#sec_risultati").appendChild(container);

    if(json.length == 0){
        const span = document.createElement("span");
        span.textContent = "Sarai il primo a votare questo sondaggio!";
        container.appendChild(span);
    }
    else{
        for(content of json) {
            const mini_container = document.createElement("div");
            mini_container.classList.add("mini_container");

            
            const opzione = document.createElement("div");
            opzione.classList.add("opzione");
            opzione.textContent = content[0].option + "";


            const n_voti = document.createElement("em");
            n_voti.textContent = "Voti: "; 
            const n_voti_value = document.createElement("strong");
            n_voti_value.textContent = content[0].n_occ_voto + " ";


            const n_votanti = document.querySelector("input[name='n_vot']").value;

            const perc_voti = document.createElement("em");
            perc_voti.textContent = "Percentuale: "; 
            const perc_voti_value = document.createElement("strong");
            perc_voti_value.textContent = (100 * content[0].n_occ_voto / n_votanti) + "%  ";

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

    document.querySelector('#registra_voto').addEventListener("click", aggiornaOpzioni);
    document.querySelector('#dettagli').addEventListener("click", aggiornaDettagli);

}






function aggiornaRisultati(){
    //ho come info: INPUT "HIDDEN" id.sondaggio e la sessione 
    const id_sondaggio = document.querySelector("input[name='id']").value;
    //Richiedo OPZIONI: partecipanti - opzione  
    fetch("get_results/"+id_sondaggio).then(responseAggiorna).then(onJSON_aggiornaRisultati);
}

document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);


















function onJSON_aggiornaDettagli(json) {
    //const id_sondaggio = document.querySelector("input[name='id']").value;
    
    document.querySelector("#sec_registra_voto").classList.add("hidden");
    
    document.querySelector("#sec_risultati").classList.add("hidden");

    document.querySelector("#sec_dettagli").classList.remove("hidden");

    document.querySelector("#sec_dettagli").innerHTML = "";



    document.querySelector("#registra_voto").classList.remove("underlined");
    document.querySelector("#risultati").classList.remove("underlined");
    
    document.querySelector("#dettagli").classList.add("underlined");


    const container = document.createElement("div");
    container.classList.add("vote_container");

    document.querySelector("#sec_dettagli").appendChild(container);

    if(json.opzioni.length == 0){
        const span = document.createElement("span");
        span.textContent = "Sarai il primo a votare questo sondaggio!";
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

    document.querySelector('#registra_voto').addEventListener("click", aggiornaOpzioni);
    document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);

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
  
function onResponse(response) {
    return response.json();
} 


function onThumbnailclick(){
    const errore = document.createElement("p");
    errore.classList.add("errore");
    errore.textContent = "Per accedere alla Sezione Commenti devi aver votato al sondaggio";
    document.querySelector("#chat").append(errore);         
    document.querySelector('#chat img').removeEventListener("click", onThumbnailclick);
}
    

function aggiungi_evento() {
    let box = document.querySelector('#chat img');
    box.addEventListener('click', onThumbnailclick);
}


const modalView = document.querySelector('#modal-view');
aggiungi_evento();



    function onJSON_API(json){
        if(json.error === undefined){
            const luogo = json.location.name;
            const meteo = json.current.condition.text;
            const icon = document.createElement('img');
            icon.src = json.current.condition.icon;
            icon.classList.add("weather");
            const div_meteo = document.createElement('span');
            div_meteo.classList.add("weather_span");
            div_meteo.textContent = "Meteo a " + luogo + " : " + meteo;
            document.querySelector('#ultimo').appendChild(div_meteo); 
            document.querySelector(".weather_span").appendChild(icon);
        }
        else{
            const div_meteo = document.createElement('span');
            div_meteo.textContent = "Informazioni meteo non disponibili";
            div_meteo.classList.add("weather_span");
            document.querySelector('#ultimo').appendChild(div_meteo);     
        }
    }
    
    
    function api(){
        let luogo = document.querySelector("input[name='luogo']").value;
        fetch("api_weather/"+luogo).then(onResponse).then(onJSON_API);   
    }
    
    
    api();
    