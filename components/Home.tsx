import { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, Image, useWindowDimensions, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { categories } from "../data/categories";
import CategoryButton from "./CategoryButton";
import AppColors from "../styles/colors";
import { Divider } from "react-native-paper";

const Home = () => {
  const [searchText, setSearchText] = useState("Useless Text");
  const { width } = useWindowDimensions();
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.headContainer}>
        <Image style={styles.pokeball} source={require("../assets/pokeball.png")} />
        <Text style={styles.text}>What Pokemon</Text>
        <Text style={{ ...styles.text, marginBottom: 15 }}>are you looking for?</Text>
      </View>
      <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
        <View style={styles.inputContainer}>
          <FontAwesome style={styles.searchIcon} name="search" size={24} color="black" />
          <TextInput style={styles.input} onChangeText={setSearchText} placeholder="Search Pokemon, Move, Ability etc." />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {categories.map((category) => (
          <CategoryButton width={width} category={category} key={category.name} />
        ))}
      </View>
      <View style={styles.pokenews}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 24 }}>Pokémon News</Text>
          <TouchableOpacity>
            <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: AppColors.blue }}>View All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <TouchableOpacity
              style={{ paddingVertical: 30, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <View>
                <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, marginBottom: 8 }}>{"Pokemon Rumble Rush\nArrives Soon"}</Text>
                <Text style={{ color: "grey" }}>23 June 2022</Text>
              </View>
              <Image source={{ uri: "https://picsum.photos/300/200" }} style={{ width: 120, height: 80, borderRadius: 20 }} />
            </TouchableOpacity>
            <Divider />
          </View>
          <View>
            <TouchableOpacity
              style={{ paddingVertical: 30, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <View>
                <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, marginBottom: 8 }}>{"Pokemon Rumble Rush\nArrives Soon"}</Text>
                <Text style={{ color: "grey" }}>23 June 2022</Text>
              </View>
              <Image source={{ uri: "https://picsum.photos/300/200" }} style={{ width: 120, height: 80, borderRadius: 20 }} />
            </TouchableOpacity>
            <Divider />
          </View>
          <View>
            <TouchableOpacity
              style={{ paddingVertical: 30, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <View>
                <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, marginBottom: 8 }}>{"Pokemon Rumble Rush\nArrives Soon"}</Text>
                <Text style={{ color: "grey" }}>23 June 2022</Text>
              </View>
              <Image source={{ uri: "https://picsum.photos/300/200" }} style={{ width: 120, height: 80, borderRadius: 20 }} />
            </TouchableOpacity>
            <Divider />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  headContainer: {
    paddingVertical: 10,
    position: "relative",
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 20,
    height: 250,
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
  pokeball: {
    width: 240,
    height: 240,
    top: -10,
    right: -105,
    position: "absolute",
    tintColor: "rgba(0,0,0, 0.05)",
  },
  pokenews: {
    flex: 1,
    paddingVertical: 30,
  },
});

export default Home;
