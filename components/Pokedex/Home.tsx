import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";
import PokeballBackground from "../commons/PokeballBackground";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackProps } from "../Routes";
import { useState } from "react";
import FAB from "./FAB";

type PokedexNavigationProps = NativeStackNavigationProp<RootStackProps, "Pokedex">;

export type PokedexHomeProps = {
  navigation: PokedexNavigationProps;
};

const Home = ({ navigation }: PokedexHomeProps) => {
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PokeballBackground />
      <View style={{ backgroundColor: "transparent", zIndex: 100 }}>
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
      <View>
                
      </View>
      <FAB />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
