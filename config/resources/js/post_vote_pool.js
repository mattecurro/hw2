function responseAggiorna(response) {
    return response.json();
}


function onJSON_aggiornaRisultati(json) {
    const id_sondaggio = document.querySelector("input[name='id']").value;
    
    
    document.querySelector("#sec_dettagli").classList.add("hidden");

    document.querySelector("#sec_risultati").classList.remove("hidden");

    document.querySelector("#sec_risultati").innerHTML = "";



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

}






function aggiornaRisultati(){
    //ho come info: INPUT "HIDDEN" id.sondaggio e la sessione 
    const id_sondaggio = document.querySelector("input[name='id']").value;
    //Richiedo OPZIONI: partecipanti - opzione  
    fetch("get_results/"+id_sondaggio).then(responseAggiorna).then(onJSON_aggiornaRisultati);
}

aggiornaRisultati();

document.querySelector('#risultati').addEventListener("click", aggiornaRisultati);





function onJSON_aggiornaDettagli(json) {
    //const id_sondaggio = document.querySelector("input[name='id']").value;
        
    document.querySelector("#sec_risultati").classList.add("hidden");

    document.querySelector("#sec_dettagli").classList.remove("hidden");

    document.querySelector("#sec_dettagli").innerHTML = "";



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




function onJSON_API(json){
    if(json.error === undefined){
        const luogo = json.location.name;
        const meteo = json.current.condition.text;
        const icon = document.createElement('img');
        icon.src = json.current.condition.icon;
        icon.classList.add("weather");
        const div_meteo = document.createElement('span');
        div_meteo.classList.add("weather_span");
        div_meteo.textContent = "Meteo a " + luogo + ": " + meteo;
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

