import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Pokemon from "../../../types/pokemon";
import { useNavigation } from "@react-navigation/native";
import HeaderBase from "../../commons/HeaderBase";
import Pokeball from "../../commons/Pokeball";

type HeaderProps = {
  pokemon: Pokemon;
  translateY: Animated.Value;
};

const Header = ({ pokemon, translateY }: HeaderProps) => {
  const navigation = useNavigation();

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId = `${pokemon.id}`.padStart(3, "0");

  const fadeStyle = {
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  return (
    <>
      <HeaderBase>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Animated.View style={fadeStyle}>
          <Text style={{ fontFamily: "CircularStdBold", color: "white", fontSize: 24, marginLeft: 7 }}>{pokemonName}</Text>
        </Animated.View>
        <Animated.View style={fadeStyle}>
          <Text style={{ fontFamily: "CircularStdBold", color: "white", fontSize: 16 }}>#{pokemonId}</Text>
        </Animated.View>
      </HeaderBase>
      <Pokeball width={160} height={160} style={{ position: "absolute", right: -40, top: -2, ...fadeStyle }} rotate />
    </>
  );
};

export default Header;
