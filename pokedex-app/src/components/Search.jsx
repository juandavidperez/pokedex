import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const Search = ({ navigation }) => {
  const [pokemon, setPokemon] = useState(null);
  const [datos, setDatos] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokemon"
          placeholderTextColor="#000"
          onChangeText={(text) => setPokemon(text)}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons
            name="search"
            size={24}
            color="#000"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FF6961",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
    width: windowWidth - 100,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  searchInput: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Search;
