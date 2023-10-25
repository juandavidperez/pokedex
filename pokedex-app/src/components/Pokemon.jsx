import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const fLMayus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Pokemon = ({ route }) => {
  const { pokemon } = route.params;
  const [showFrontImage, setShowFrontImage] = useState(true);

  const handleImagePress = () => {
    setShowFrontImage(!showFrontImage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pokemonContainer}>
        {pokemon.sprites && (
          <TouchableOpacity
            onPress={() => {
              handleImagePress();
            }}
          >
            <Image
              source={{
                uri: showFrontImage
                  ? pokemon.sprites.front_default
                  : pokemon.sprites.back_default,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
        <View style={styles.infoContainer}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FF6961",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonContainer: {
    backgroundColor: "#fff",
    width: windowWidth - 40,
    height: "80%",
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 25,
  },
  infoContainer: {
    alignItems: "center",
    width: "90%",
    height: "50%",
    backgroundColor: "#FF6961",
    borderRadius: 20,
  },
});

export default Pokemon;
