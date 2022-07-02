import { Image, StyleSheet, useWindowDimensions } from "react-native";

const PokeballBackground = () => {
  const { width } = useWindowDimensions();
  const size = width * 0.664;
  return <Image style={{ ...styles.pokeball, width: size, height: size }} source={require("../../assets/pokeball.png")} />;
};

const styles = StyleSheet.create({
  pokeball: {
    top: -50,
    right: -90,
    position: "absolute",
    tintColor: "rgba(0,0,0, 0.05)",
  },
});

export default PokeballBackground;
