import { View, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Pokeball from "../../commons/Pokeball";

const Header = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const pokeballSize = width * 0.664;

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <Pokeball width={pokeballSize} height={pokeballSize} style={{ position: "absolute", top: -50, right: -90 }} />
      <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 27, paddingTop: 18 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 27, marginTop: 40 }}>
        <Text style={{ fontFamily: "CircularStdBlack", fontSize: 40 }}>Pokedex</Text>
      </View>
    </View>
  );
};

export default Header;
