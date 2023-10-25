import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const pokemonBackgroundColors = {
  fire: "#Fbbd62",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const windowWidth = Dimensions.get("window").width;
const fLMayus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Pokemon = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageContainer,
          {
            backgroundColor:
              pokemonBackgroundColors[pokemon.types[0].type.name],
          },
        ]}
      >
        {pokemon.sprites && (
          <Image
            source={{
              uri: pokemon.sprites.other["official-artwork"].front_default,
            }}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.infoContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "30%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderColor: "#000",
    borderWidth: 1,
  },
});

export default Pokemon;
