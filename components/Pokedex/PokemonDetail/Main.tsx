import Pokemon from "../../../types/pokemon";
import { View, Text, Animated, Image, Easing } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import PokemonTypeChip from "../../commons/PokemonTypeChip";
import { useEffect, useMemo } from "react";
import Pokeball from "../../commons/Pokeball";

type MainProps = {
  pokemon: Pokemon;
};

const Main = ({ pokemon }: MainProps) => {
  const pokedexNumberTranslateX = useMemo(() => new Animated.Value(100), []);
  const generaTranslateX = useMemo(() => new Animated.Value(200), []);

  const pokedexNumberStyle = {
    transform: [
      {
        translateX: pokedexNumberTranslateX.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 100],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  const generaStyle = {
    transform: [
      {
        translateX: generaTranslateX.interpolate({
          inputRange: [0, 200],
          outputRange: [0, 200],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(pokedexNumberTranslateX, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
      Animated.timing(generaTranslateX, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  }, [pokedexNumberTranslateX, generaTranslateX]);

  const pokemonId = `${pokemon.id}`.padStart(3, "0");

  return (
    <>
      <View style={{ paddingHorizontal: 27 }}>
        <View style={{ marginTop: 30, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <SharedElement id={pokemon.id + "name"}>
            <Text style={{ fontFamily: "CircularStdBold", fontSize: 40, color: "white" }}>
              {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </Text>
          </SharedElement>
          <Animated.View style={pokedexNumberStyle}>
            <Text style={{ fontFamily: "CircularStdBold", fontSize: 20, color: "white" }}>#{pokemonId}</Text>
          </Animated.View>
        </View>
        <View style={{ flexDirection: "row", paddingVertical: 20, alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            {pokemon.types.map((type) => (
              <SharedElement key={type.slot} id={pokemon.id + type.type.name}>
                <PokemonTypeChip type={type.type.name} />
              </SharedElement>
            ))}
          </View>
          <Animated.View style={generaStyle}>
            <Text style={{ fontFamily: "CircularStdMedium", color: "white", fontSize: 16 }}>Flame Pokemon</Text>
          </Animated.View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Pokeball rotate width={240} height={240} style={{ position: "absolute" }} />
        <View style={{ marginTop: 15 }}>
          <SharedElement id={pokemon.id + "image"}>
            <Image source={{ uri: pokemon.sprites.other["official-artwork"].front_default }} style={{ width: 200, height: 200 }} />
          </SharedElement>
        </View>
      </View>
    </>
  );
};

export default Main;
