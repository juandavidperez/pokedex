import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { typesPokemon } from "./Search";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
              typesPokemon.backgroundColor[pokemon.types[0].type.name] + "90",
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
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 25,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <MaterialCommunityIcons
            name="pokeball"
            size={20}
            color={typesPokemon.backgroundColor[pokemon.types[0].type.name]}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {fLMayus(pokemon.name)}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {" "}
            #{pokemon.id}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#aaa",
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
  },
  infoContainer: {
    width: "100%",
    height: "70%",
    padding: 20,
    alignItems: "center",
  },
});

export default Pokemon;
