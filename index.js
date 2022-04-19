const n = document.getElementById("name");
const num = document.getElementById("number");
const t = document.getElementById("type");
const h = document.getElementById("height");
const w = document.getElementById("weight");
const d = document.getElementById("desc");
const imagen = document.getElementById("img");

const txt = document.getElementById("texto");
const btn = document.getElementById("boton");

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
      let arr = b_t.split("");
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
    console.log(data);
    const res1 = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${b_t}`
    );
    const data1 = await res1.json();
    console.log(data1);
    nombre = capitalizarPrimeraLetra(data.name);
    altura = data.height;
    peso = data.weight;
    descripcion = data1.flavor_text_entries[0].flavor_text;
    n.innerHTML = `<strong>Nombre:</strong> ${nombre}`;
    num.innerHTML = `<strong>Id: </strong> ${data.id}`;
    if (data.types.length > 1) {
      const res2 = await fetch(`${data.types[0].type.url}`);
      const data2 = await res2.json();
      console.log(data2);
      tipo = capitalizarPrimeraLetra(data2.names[5].name);
      const res3 = await fetch(`${data.types[1].type.url}`);
      const data3 = await res3.json();
      console.log(data3);
      tipo2 = capitalizarPrimeraLetra(data3.names[5].name);
      t.innerHTML = `<strong>Tipo:</strong> ${tipo}, ${tipo2}`;
    } else {
      const res2 = await fetch(`${data.types[0].type.url}`);
      const data2 = await res2.json();
      console.log(data2);
      tipo = capitalizarPrimeraLetra(data2.names[5].name);
      t.innerHTML = `<strong>Tipo:</strong> ${tipo}`;
    }
    h.innerHTML = `<strong>Altura:</strong> ${data.height / 10}m`;
    w.innerHTML = `<strong>Peso:</strong> ${data.weight / 10}kg`;
    for (i = 0; i < data1.flavor_text_entries.length; i++) {
      if (data1.flavor_text_entries[i].language.name == "es") {
        d.innerHTML = `<strong>Descripción:</strong> ${data1.flavor_text_entries[i].flavor_text}`;
        console.log(data1.flavor_text_entries[i].flavor_text);
      }
    }
    imagen.src = `${data.sprites.front_default}`;
  } catch (error) {
    console.log(error);
  }
};
