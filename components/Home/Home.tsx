import { useRef } from "react";
import { ScrollView, View, StyleSheet, Animated } from "react-native";
import HeaderCategory from "./HeaderCategory";
import PokemonNews from "./PokemonNews";

const Home = () => {
  return (
    <ScrollView style={{ backgroundColor: "#f5f5f5", flex: 1 }} contentContainerStyle={styles.scrollView}>
      <View
        style={{
          backgroundColor: "white",
          height: 1000,
          position: "absolute",
          top: -1000,
          left: 0,
          right: 0,
        }}
      />
      <HeaderCategory />
      <PokemonNews />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f5f5f5",
  },
});

export default Home;
