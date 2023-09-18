import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const FirstScreen = ({ navigation }) => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/pokedex_logo.png")}
        style={{
          width: 310,
          height: 110,
          resizeMode: "contain",
          marginBottom: 50,
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Image
          source={require("../../assets/pokedex.png")}
          style={{ width: 320, height: 240, resizeMode: "contain" }}
        />
      </TouchableOpacity>
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
});
export default FirstScreen;
