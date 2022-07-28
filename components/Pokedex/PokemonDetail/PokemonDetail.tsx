import { RouteProp, useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { PokedexStackParamsList } from "../PokdexStack";

const PokemonDetail = () => {
  const route = useRoute<RouteProp<PokedexStackParamsList, "PokemonDetail">>();
  const {
    params: { pokemon },
  } = route;
  return (
    <SharedElement id={`${pokemon.id}`}>
      <Image source={{ uri: pokemon.sprites.other["official-artwork"].front_default }} style={{ width: 200, height: 200 }} />
    </SharedElement>
  );
};

export default PokemonDetail;
