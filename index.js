//Los elementos donde se muestran los datos
const n = document.getElementById("name");
const num = document.getElementById("number");
const t = document.getElementById("type");
const h = document.getElementById("height");
const w = document.getElementById("weight");
const d = document.getElementById("desc");
const imagen = document.getElementById("img");
//La barra de texto y el boton
const txt = document.getElementById("texto");
const btn = document.getElementById("boton");
//Elementos interactivos de la pokedex
const bbtn1 = document.getElementById("barbutton1");
const bbtn2 = document.getElementById("barbutton2");
const topc = document.getElementById("topcross");
const botc = document.getElementById("botcross");
const topr = document.getElementById("rightcross");
const topl = document.getElementById("leftcross");
const bigbb = document.getElementById("bigbluebutton");

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const respuesta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126`
    );
    const datos = await respuesta.json();
    console.log(datos);
    btn.addEventListener("click", () => {
      const b_t = txt.value.toLowerCase();
      for (i = 0; i < datos.results.length; i++) {
        if (b_t == datos.results[i].name) {
          fetchPokemon(b_t);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchPokemon = async (b_t) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${b_t}`);
    const data = await res.json();
    const res1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${b_t}`
    );
    const data1 = await res1.json();
    nombre = capitalizarPrimeraLetra(data.name);
    altura = data.height;
    peso = data.weight;
    descripcion = data1.flavor_text_entries[0].flavor_text;
    n.innerHTML = `<strong>Nombre:</strong> ${nombre}`;
    num.innerHTML = `<strong>Id: </strong> ${data.id}`;
    if (data.types.length > 1) {
      const res2 = await fetch(`${data.types[0].type.url}`);
      const data2 = await res2.json();
      tipo = capitalizarPrimeraLetra(data2.names[5].name);
      const res3 = await fetch(`${data.types[1].type.url}`);
      const data3 = await res3.json();

      tipo2 = capitalizarPrimeraLetra(data3.names[5].name);
      t.innerHTML = `<strong>Tipo:</strong> ${tipo}, ${tipo2}`;
    } else {
      const res2 = await fetch(`${data.types[0].type.url}`);
      const data2 = await res2.json();
      tipo = capitalizarPrimeraLetra(data2.names[5].name);
      t.innerHTML = `<strong>Tipo:</strong> ${tipo}`;
    }
    h.innerHTML = `<strong>Altura:</strong> ${data.height / 10}m`;
    w.innerHTML = `<strong>Peso:</strong> ${data.weight / 10}kg`;
    for (i = 0; i < data1.flavor_text_entries.length; i++) {
      if (data1.flavor_text_entries[i].language.name == "es") {
        d.innerHTML = `<strong>Descripción:</strong> ${data1.flavor_text_entries[i].flavor_text}`;
      }
    }

    imagen.src = `${data.sprites.front_default}`;
    topc.addEventListener("click", () => {
      switch (imagen.src) {
        case data.sprites.front_default:
          imagen.src = `${data.sprites.front_default}`;
          break;
        case data.sprites.back_default:
          imagen.src = `${data.sprites.front_default}`;
          break;
        case data.sprites.front_shiny:
          imagen.src = `${data.sprites.front_shiny}`;
          break;
        case data.sprites.back_shiny:
          imagen.src = `${data.sprites.front_shiny}`;
          break;
        case data.sprites.other["official-artwork"].front_default:
          imagen.src = `${data.sprites.front_default}`;
          break;
      }
    });
    botc.addEventListener("click", () => {
      switch (imagen.src) {
        case data.sprites.front_default:
          imagen.src = `${data.sprites.back_default}`;
          break;
        case data.sprites.back_default:
          imagen.src = `${data.sprites.back_default}`;
          break;
        case data.sprites.front_shiny:
          imagen.src = `${data.sprites.back_shiny}`;
          break;
        case data.sprites.back_shiny:
          imagen.src = `${data.sprites.back_shiny}`;
          break;
        case data.sprites.other["official-artwork"].front_default:
          imagen.src = `${data.sprites.back_default}`;
          break;
      }
    });
    bbtn1.addEventListener("click", () => {
      switch (imagen.src) {
        case data.sprites.front_default:
          imagen.src = `${data.sprites.front_default}`;
          break;
        case data.sprites.back_default:
          imagen.src = `${data.sprites.back_default}`;
          break;
        case data.sprites.front_shiny:
          imagen.src = `${data.sprites.front_default}`;
          break;
        case data.sprites.back_shiny:
          imagen.src = `${data.sprites.back_default}`;
          break;
        case data.sprites.other["official-artwork"].front_default:
          imagen.src = `${data.sprites.front_default}`;
          break;
      }
    });
    bbtn2.addEventListener("click", () => {
      switch (imagen.src) {
        case data.sprites.front_default:
          imagen.src = `${data.sprites.front_shiny}`;
          break;
        case data.sprites.back_default:
          imagen.src = `${data.sprites.back_shiny}`;
          break;
        case data.sprites.front_shiny:
          imagen.src = `${data.sprites.front_shiny}`;
          break;
        case data.sprites.back_shiny:
          imagen.src = `${data.sprites.back_shiny}`;
          break;
        case data.sprites.other["official-artwork"].front_default:
          imagen.src = `${data.sprites.front_shiny}`;
          break;
      }
    });
    topr.addEventListener("click", () => {
      sleep(250).then(() => {
        fetchPokemon(data.id + 1);
        data.id = data.id + 1;
      });
    });
    topl.addEventListener("click", () => {
      sleep(250).then(() => {
        fetchPokemon(data.id - 1);
        data.id = data.id - 1;
      });
    });
    bigbb.addEventListener("click", () => {
      imagen.src = `${data.sprites.other["official-artwork"].front_default}`;
    });
  } catch (error) {
    console.log(error);
  }
};
