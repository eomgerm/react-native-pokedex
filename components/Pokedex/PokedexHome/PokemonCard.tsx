import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { POKEMON_TYPE_COLORS } from "../../../data/pokemonTypeColors";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Pokemon from "../../../types/pokemon";
import Pokeball from "../../commons/Pokeball";
import { PokedexStackParamsList } from "../PokdexStack";
import { SharedElement } from "react-navigation-shared-element";
import PokemonTypeChip from "../../commons/PokemonTypeChip";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<PokedexStackParamsList>>();

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId = `${pokemon.id}`.padStart(3, "0");
  const types = pokemon.types;

  const styles = StyleSheet.create({
    button: {
      height: 110,
      backgroundColor: POKEMON_TYPE_COLORS[pokemon.types[0].name],
      margin: 8,
      padding: 16,
      borderRadius: 12,
      overflow: "hidden",
      alignItems: "flex-start",
      flex: 1,
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("PokemonDetail", { pokemon });
      }}
    >
      <SharedElement id={pokemon.id + "name"}>
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "white", marginBottom: 5 }}>{pokemonName}</Text>
      </SharedElement>
      <View style={{ flex: 1, marginTop: 5 }}>
        {types.map((type) => (
          <SharedElement key={type.slot} id={pokemon.id + type.name}>
            <PokemonTypeChip size="small" type={type.name} />
          </SharedElement>
        ))}
      </View>

      <View style={{ position: "absolute", top: 8, right: 8 }}>
        <Text style={{ color: "#0003", fontFamily: "CircularStdBold" }}>#{pokemonId}</Text>
      </View>
      <View style={{ position: "absolute", bottom: 4, right: 4, zIndex: 1 }}>
        <SharedElement id={pokemon.id + "image"}>
          <Image source={{ uri: pokemon.sprites }} style={{ width: 72, height: 72 }} />
        </SharedElement>
      </View>
      <Pokeball width={88} height={88} style={{ position: "absolute", right: -8, bottom: -8 }} color="rgba(255 ,255, 255, 0.14)" />
    </TouchableOpacity>
  );
};

export default PokemonCard;
