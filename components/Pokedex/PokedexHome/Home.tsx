import { View, FlatList } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import FAB from "./FAB/FAB";
import axios from "axios";
import PokemonApiResult, { Result } from "../../../types/pokemon_api_result";
import Pokemon from "../../../types/pokemon";
import PokemonCard from "./PokemonCard";
import Header from "./Header";
import Loading from "../../commons/Loading";

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadPokemons = useCallback(
    async (offsetValue = offset, shouldRefresh = false) => {
      setLoading(true);
      const { data } = await axios.get<PokemonApiResult>(`https://pokeapi.co/api/v2/pokemon/?offset=${offsetValue}`);
      const pokemonsArr = await Promise.all(
        data.results.map(async (result: Result) => {
          const { data: pokemonData } = await axios.get<Pokemon>(result.url);
          return pokemonData;
        })
      );
      setOffset(shouldRefresh ? 20 : (prev) => prev + 20);
      setPokemons(shouldRefresh ? pokemonsArr : [...pokemons, ...pokemonsArr]);
      setLoading(false);
    },
    [pokemons, setLoading]
  );

  const refreshPokemons = useCallback(async () => {
    setRefreshing(true);
    loadPokemons(0, true);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadPokemons();
  }, []);

  const ListFooterComponent = useMemo(() => (loading ? <Loading /> : null), [loading]);

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Header />
      <FlatList
        style={{ flex: 1, marginTop: 8 }}
        data={pokemons}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 24 }}
        keyExtractor={(pokemon) => String(pokemon.id)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadPokemons()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ListFooterComponent}
        onRefresh={() => refreshPokemons()}
        refreshing={refreshing}
        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
      />
      <FAB />
    </View>
  );
};

export default Home;
