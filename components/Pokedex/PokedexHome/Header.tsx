import { View, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Pokeball from "../../commons/Pokeball";
import Constants from "expo-constants";
import HeaderBase from "../../commons/HeaderBase";

const Header = () => {
  const navigation = useNavigation();

  return (
    <>
      <HeaderBase>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </HeaderBase>
      <Text style={{ paddingHorizontal: 21, fontFamily: "CircularStdBlack", fontSize: 40, paddingVertical: 20 }}>Pokedex</Text>
    </>
  );
};

export default Header;
