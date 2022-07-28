import { View, Text, StyleSheet, TextInput, Image, useWindowDimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { categories } from "../../data/categories";
import CategoryButton from "./CategoryButton";
import { useState } from "react";
import { HomeProps } from "./Home";
import Pokeball from "../commons/Pokeball";

const HeaderCategory = ({ navigation }: HomeProps) => {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const pokeballSize = width * 0.664;

  return (
    <>
      <View style={styles.headContainer}>
        <Pokeball width={pokeballSize} height={pokeballSize} style={{ position: "absolute", top: -50, right: -90 }} />
        <Text style={styles.text}>What Pokemon</Text>
        <Text style={{ ...styles.text, marginBottom: 15 }}>are you looking for?</Text>
      </View>
      <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
        <View style={styles.inputContainer}>
          <FontAwesome style={styles.searchIcon} name="search" size={24} color="black" />
          <TextInput style={styles.input} onChangeText={setSearchText} value={searchText} placeholder="Search Pokemon, Move, Ability etc." />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {categories.map((category) => (
          <CategoryButton width={width} category={category} key={category.name} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    paddingVertical: 10,
    position: "relative",
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 20,
    height: 240,
  },
  buttonContainer: {
    paddingTop: 30,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "CircularStdBlack",
    fontSize: 36,
  },
  inputContainer: {
    height: 50,
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginVertical: 10,
  },
  input: {
    marginLeft: 45,
    height: 40,
    fontSize: 18,
    fontFamily: "CircularStdMedium",
  },
  searchIcon: {
    position: "absolute",
    left: 18,
  },
});

export default HeaderCategory;
