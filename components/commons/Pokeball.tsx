import { Image, StyleSheet, View, ViewStyle } from "react-native";
import pokeballImage from "../../assets/pokeball.png";

type PoekballProps = {
  width: number;
  height: number;
  color: string;
  style: ViewStyle;
};

const Pokeball = ({ width, height, color, style }: PoekballProps) => {
  return (
    <View style={style}>
      <Image style={{ width, height, tintColor: color }} source={pokeballImage} />
    </View>
  );
};

Pokeball.defaultProps = {
  color: "rgba(0,0,0, 0.05)",
  style: {},
};

export default Pokeball;
