import { View, FlatList } from "react-native";
import PokeballBackground from "../commons/PokeballBackground";
import { useEffect, useState } from "react";
import FAB from "./FAB/FAB";
import axios from "axios";
import PokemonApiResult, { Result } from "../../types/pokemon_api_result";
import Pokemon from "../../types/pokemon";
import PokemonCard from "./PokemonCard";
import Header from "./Header";

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<PokemonApiResult>("https://pokeapi.co/api/v2/pokemon/");
      const pokemonsArr = await Promise.all(
        data.results.map(async (result: Result) => {
          const { data: pokemonData } = await axios.get<Pokemon>(result.url);
          return pokemonData;
        })
      );
      setPokemons(pokemonsArr);
    })();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <PokeballBackground />
      <Header />
      <FlatList
        style={{ flex: 1, marginTop: 8 }}
        data={pokemons}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
        keyExtractor={(pokemon) => String(pokemon.id)}
        numColumns={2}
        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
      />
      <FAB />
    </View>
  );
};

export default Home;
