import { View, Image, StyleSheet, Text } from "react-native";

const Home = () => {
  return (
    <View>
      <Image style={styles.pokeball} source={require("../../assets/pokeball.png")} />
      <Text>This is home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pokeball: {
    width: 270,
    height: 270,
    top: -80,
    right: -90,
    position: "absolute",
    tintColor: "rgba(0,0,0, 0.05)",
  },
});

export default Home;
