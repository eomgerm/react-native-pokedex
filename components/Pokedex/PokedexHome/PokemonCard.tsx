import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { POKEMON_TYPE_COLORS } from "../../../data/pokemonTypeColors";
import Pokemon from "../../../types/pokemon";
import { PokedexStackParamsList } from "../PokdexStack";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation();

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId = `${pokemon.id}`.padStart(3, "0");
  const types = pokemon.types;

  return (
    <TouchableOpacity
      style={{
        height: 110,
        backgroundColor: POKEMON_TYPE_COLORS[pokemon.types[0].type.name],
        margin: 8,
        padding: 16,
        borderRadius: 12,
        overflow: "hidden",
        alignItems: "flex-start",
        flex: 1,
      }}
    >
      <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "white", marginBottom: 5 }}>{pokemonName}</Text>
      <View style={{ flex: 1 }}>
        {types.map((type) => (
          <View
            key={type.slot}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              paddingVertical: 3,
              paddingHorizontal: 8,
              borderRadius: 20,
              marginBottom: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "CircularStdBold",
                color: "white",
                fontSize: 12,
              }}
            >
              {type.type.name[0].toUpperCase() + type.type.name.slice(1)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={{ position: "absolute", top: 8, right: 8, color: "#0003", fontFamily: "CircularStdBold" }}>#{pokemonId}</Text>
      <Image
        source={{ uri: pokemon.sprites.other["official-artwork"].front_default }}
        style={{ width: 72, height: 72, position: "absolute", bottom: 4, right: 4 }}
      />
      <Image
        source={require("../../../assets/pokeball.png")}
        style={{ width: 88, height: 88, position: "absolute", right: -8, bottom: -8, tintColor: "rgba(255 ,255, 255, 0.14)" }}
      />
    </TouchableOpacity>
  );
};

export default PokemonCard;
