import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { POKEMON_TYPE_COLORS } from "../../../data/pokemonTypeColors";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Pokemon from "../../../types/pokemon";
import Pokeball from "../../commons/Pokeball";
import { PokedexStackParamsList } from "../PokdexStack";
import { SharedElement } from "react-navigation-shared-element";

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
      backgroundColor: POKEMON_TYPE_COLORS[pokemon.types[0].type.name],
      margin: 8,
      padding: 16,
      borderRadius: 12,
      overflow: "hidden",
      alignItems: "flex-start",
      flex: 1,
    },
  });

  type PokemonTypeChipProps = {
    type: string;
  };

  const PokemonTypeChip = ({ type }: PokemonTypeChipProps) => {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 20,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        fontFamily: "CircularStdBold",
        color: "white",
        fontSize: 12,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{type[0].toUpperCase() + type.slice(1)}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("PokemonDetail", { pokemon });
      }}
    >
      <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "white", marginBottom: 5 }}>{pokemonName}</Text>
      <View style={{ flex: 1 }}>
        {types.map((type) => (
          <PokemonTypeChip key={type.slot} type={type.type.name} />
        ))}
      </View>

      <Text style={{ position: "absolute", top: 8, right: 8, color: "#0003", fontFamily: "CircularStdBold" }}>#{pokemonId}</Text>
      <View style={{ position: "absolute", bottom: 4, right: 4 }}>
        <SharedElement id={`${pokemon.id}`}>
          <Image source={{ uri: pokemon.sprites.other["official-artwork"].front_default }} style={{ width: 72, height: 72 }} />
        </SharedElement>
      </View>
      <Pokeball width={88} height={88} style={{ position: "absolute", right: -8, bottom: -8 }} color="rgba(255 ,255, 255, 0.14)" />
    </TouchableOpacity>
  );
};

export default PokemonCard;
