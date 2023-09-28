import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const typesPokemon = {
  color: {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
  },
  nameIcon: {
    normal: "body",
    fire: "flame",
    water: "water",
    electric: "flash",
    grass: "leaf",
    ice: "snow",
    fighting: "fist",
    poison: "skull",
    ground: "earth",
    flying: "airplane",
    psychic: "eye",
    bug: "bug",
    rock: "skull",
    ghost: "ghost",
    dragon: "dragon",
    dark: "moon",
    steel: "cube",
  },
};
const fLMayus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Search = ({ navigation }) => {
  const [input, setInput] = useState(null);
  const [datos, setDatos] = useState(null);

  //una funcion que toma el nombre del pokemon y hace una peticion a la api
  const getPokemon = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
      );
      if (!response.ok) throw "Error al obtener los datos";
      const data = await response.json();
      const results = data.results;
      const filter = (results, input) => {
        if (input.length <= 3) {
          return results.filter((pokemon) =>
            pokemon.name.startsWith(input.toLowerCase())
          );
        } else {
          return results.filter((pokemon) =>
            pokemon.name.includes(input.toLowerCase())
          );
        }
      };

      const pokemonData = await Promise.all(
        filter(results, input).map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          if (!response.ok) throw "Error al obtener los datos";
          const data = await response.json();
          return data;
        })
      );

      setDatos(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokemon"
          placeholderTextColor="#000"
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity onPress={() => getPokemon()}>
          <Ionicons
            name="search"
            size={24}
            color="#000"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.pokemonContainer}>
        {datos && (
          <View style={styles.pokemonList}>
            {datos.map((pokemon) => {
              return (
                <TouchableOpacity key={pokemon.id} style={styles.pokemon}>
                  <Text style={styles.pokemonName}>
                    {fLMayus(pokemon.name)}
                  </Text>
                  <Text style={styles.pokemonId}>#{pokemon.id}</Text>
                  <Image
                    source={{ uri: pokemon.sprites.front_default }}
                    style={{ width: 100, height: 100 }}
                  />
                  <View style={{ flexDirection: "row" }}>
                    {pokemon.types.map((type) => {
                      return (
                        <View
                          key={type.type.name}
                          style={{
                            backgroundColor: typesPokemon.color[type.type.name],
                            borderRadius: 5,
                            padding: 5,
                            margin: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {type.type.name === "dragon" ? (
                            <FontAwesome5
                              name="dragon"
                              size={16}
                              color="#fff"
                            />
                          ) : type.type.name === "flying" ? (
                            <FontAwesome5 name="dove" size={16} color="#fff" />
                          ) : type.type.name === "fighting" ? (
                            <MaterialCommunityIcons
                              name="boxing-glove"
                              size={16}
                              color="#fff"
                              style={{ transform: [{ scaleX: -1 }] }}
                            />
                          ) : type.type.name === "ghost" ? (
                            <MaterialCommunityIcons
                              name="ghost"
                              size={16}
                              color="#fff"
                            />
                          ) : (
                            <Ionicons
                              name={typesPokemon.nameIcon[type.type.name]}
                              size={16}
                              color="#fff"
                            />
                          )}
                          <Text style={{ color: "#fff" }}>
                            {type.type.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FF6961",
  },
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 65,
    width: windowWidth - 100,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  searchInput: {
    width: "80%",
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  pokemonContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  pokemonList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  pokemon: {
    alignItems: "center",
    justifyContent: "center",
    width: 170,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 7,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pokemonId: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Search;
