import { View, FlatList, useWindowDimensions } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import FAB from "./FAB/FAB";
import axios from "axios";
import PokemonApiResult, { Result } from "../../../types/pokemon_api_result";
import Pokemon, { Stat } from "../../../types/pokemon";
import PokemonCard from "./PokemonCard";
import Header from "./Header";
import Loading from "../../commons/Loading";
import Pokeball from "../../commons/Pokeball";
import PokemonRaw from "../../../types/pokemon_raw";
import PokemonSpecie from "../../../types/pokemon_speice";

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
          const { data: pokemonData } = await axios.get<PokemonRaw>(result.url);
          const { data: pokemonSpeciesData } = await axios.get<PokemonSpecie>(pokemonData.species.url);
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            types: pokemonData.types.map((type) => {
              return { name: type.type.name, slot: type.slot };
            }),
            sprites: pokemonData.sprites.other["official-artwork"].front_default,
            genera: pokemonSpeciesData.genera.find((genera) => genera.language.name === "en")?.genus,
            flavor_text: pokemonSpeciesData.flavor_text_entries
              .find((flavorText) => flavorText.language.name === "en" && flavorText.version.name === "red")
              ?.flavor_text.replace(/\f/g, " ")
              .replace(/\n/g, " "),
            height: Number((pokemonData.height * 0.1).toFixed(2)),
            weight: Number((pokemonData.weight * 0.1).toFixed(2)),
            gender_rate: pokemonSpeciesData.gender_rate,
            base_experience: pokemonData.base_experience,
            egg_groups: pokemonSpeciesData.egg_groups.map((group) => group.name),
            stats: pokemonData.stats.map((stat) => {
              let name = "";

              if (stat.stat.name === "hp") {
                name = "HP";
              } else if (stat.stat.name === "attack") {
                name = "Attack";
              } else if (stat.stat.name === "defense") {
                name = "Defense";
              } else if (stat.stat.name === "special-attack") {
                name = "Sp. Atk";
              } else if (stat.stat.name === "special-defense") {
                name = "Sp. Def";
              } else if (stat.stat.name === "speed") {
                name = "Speed";
              }

              return {
                base_stat: stat.base_stat,
                name,
              } as Stat;
            }),
          } as Pokemon;
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
  const { width } = useWindowDimensions();
  const pokeballSize = width * 0.664;

  return (
    <View style={{ flex: 1 }}>
      <Pokeball width={pokeballSize} height={pokeballSize} style={{ position: "absolute", top: -50, right: -93 }} />
      <Header />
      <FlatList
        style={{ flex: 1, marginTop: 8 }}
        data={pokemons}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 12 }}
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
