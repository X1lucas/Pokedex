
const urlpokemon = "https://pokeapi.co/api/v2/pokemon?limit=1225";


const listaPokemons = document.getElementById("lista-pokemon");

// Mapear os elementos de busca
const inputBusca = document.getElementById("textBusca");

// Função para buscar as músicas da API
async function CarregarPokemon(){
    try {
        console.log("Carregando Pokémons...");     
        const resposta = await fetch(urlpokemon); // Realiza a requisição para a API
        const lista_pokemons = await resposta.json();
        console.log("Pokémons: ", lista_pokemons); // Exibe as músicas no console para verificação

        lista_pokemons.results.forEach(async (pokemon) => { // Itera sobre cada música e cria um item de lista para exibi-la
            
            //divPokemon.textContent = `${nome}`
            const respostaPokemon = await fetch(pokemon.url);
            const dadosPokemon = await respostaPokemon.json();

            const nome = dadosPokemon.name;

            const imagem = dadosPokemon.sprites.front_default;
            const divPokemon = document.createElement("div")
            
            divPokemon.setAttribute('class', 'card ');

            const imagemPokemon = document.createElement("img")

            imagemPokemon.setAttribute("src", imagem);
            imagemPokemon.setAttribute("class", "card-img-top");
            divPokemon.appendChild(imagemPokemon);
            divPokemon.appendChild(document.createTextNode(nome));

            listaPokemons.appendChild(divPokemon);  
        });

    } catch (error){
        console.error("Erro ao carregar pokémons:", error);
    }
}

CarregarPokemon();

// Função para filtrar as músicas com base na busca
inputBusca.addEventListener("input", () => {
    
    const termoBusca = inputBusca.value.toLowerCase(); // Obtém o termo de busca e converte para minúsculas para comparação
    const todasMusicas = listaMusicas.getElementsByTagName("li"); // Obtém todos os itens de música exibidos

    for (const item of todasMusicas) { // Itera sobre cada item de música
        // Verifica se o texto do item inclui o termo de busca
        if(item.textContent.toLowerCase().includes(termoBusca)){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    }

});