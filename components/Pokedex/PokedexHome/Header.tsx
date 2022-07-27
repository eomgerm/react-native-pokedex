import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "transparent" }}>
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
