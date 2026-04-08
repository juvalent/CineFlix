async function buscarFilme(){

  navigator.vibrate(100);

  let nome = document.getElementById("search").value.trim()
  let container = document.getElementById("filmes")

  if(nome === ""){
    container.innerHTML = "<p>Digite um filme 🎬</p>"
    return
  }

  container.innerHTML = "<p>Carregando...</p>"

  try{
    let url = `https://imdb.iamidiotareyoutoo.com/search?q=${nome}`

    let resposta = await fetch(url)
    let dados = await resposta.json()

    let filmes = dados.description

    if(!filmes){
      container.innerHTML = "<p>Não encontrado 😢</p>"
      return
    }

    container.innerHTML = ""

    filmes.forEach(filme => {
      container.innerHTML += `
        <div class="card">
          <img src="${filme['#IMG_POSTER']}" loading="lazy"/>
          <h3>${filme['#TITLE']}</h3>
        </div>
      `
    })

  } catch{
    container.innerHTML = "<p>Erro ⚠️</p>"
  }
}

function usarMicrofone(){

  let container = document.getElementById("filmes")
  container.innerHTML = "<p>🎤 Ouvindo...</p>"

  const reconhecimento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  reconhecimento.lang = "pt-BR";

  reconhecimento.start();

  reconhecimento.onresult = function(event){
    const texto = event.results[0][0].transcript;

    document.getElementById("search").value = texto;

    buscarFilme();
  };

  reconhecimento.onerror = function(){
    container.innerHTML = "<p>Erro no microfone ⚠️</p>"
  };
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}