import { RouteProp, useRoute } from "@react-navigation/native";
import { useWindowDimensions, View } from "react-native";
import { POKEMON_TYPE_COLORS } from "../../../data/pokemonTypeColors";
import { PokedexStackParamsList } from "../PokdexStack";
import Header from "./Header";
import Main from "./Main";
import Block from "./Block";
import Dots from "./Dots";
import Constants from "expo-constants";

const PokemonDetail = () => {
  const route = useRoute<RouteProp<PokedexStackParamsList, "PokemonDetail">>();
  const {
    params: { pokemon },
  } = route;

  const { height } = useWindowDimensions();

  return (
    <View style={{ backgroundColor: POKEMON_TYPE_COLORS[pokemon.types[0].type.name], flex: 1, paddingTop: 50 }}>
      <Dots />
      <Block />
      <Header pokemon={pokemon} />
      <Main pokemon={pokemon} />
      <View style={{ flex: 1, position: "relative" }}>
        <View
          style={{
            height: height - (Constants.statusBarHeight + 64),
            backgroundColor: "white",
            paddingHorizontal: 16,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        ></View>
      </View>
    </View>
  );
};

export default PokemonDetail;
