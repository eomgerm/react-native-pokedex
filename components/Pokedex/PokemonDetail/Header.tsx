import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Pokemon from "../../../types/pokemon";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  pokemon: Pokemon;
};

const Header = ({ pokemon }: HeaderProps) => {
  const navigation = useNavigation();

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId = `${pokemon.id}`.padStart(3, "0");

  return (
    <View style={{ backgroundColor: "transparent", paddingHorizontal: 27 }}>
      <View style={{ justifyContent: "space-between", flexDirection: "row", paddingTop: 18, alignItems: "baseline" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "CircularStdBold", color: "white", fontSize: 24, marginLeft: 7 }}>{pokemonName}</Text>
        <Text style={{ fontFamily: "CircularStdBold", color: "white", fontSize: 16 }}>#{pokemonId}</Text>
      </View>
    </View>
  );
};

export default Header;
