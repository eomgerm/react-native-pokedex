import { Animated, Text, View } from "react-native";
import { TabProps } from "../../Details";
import { POKEMON_TYPE_COLORS } from "../../../../../../data/pokemonTypeColors";
import { useEffect, useMemo, useState } from "react";
import TypeEffectiveness from "./TypeEffectiveness";

const BaseStats = ({ pokemon, currentTab }: TabProps) => {
  const [animationDone, setAnimationDone] = useState<boolean>(false);

  type StatProps = {
    name: string;
    stat: number;
  };

  const Stat = ({ name, stat }: StatProps) => {
    const fill = useMemo(() => new Animated.Value(0), []);

    const fillStyle = animationDone
      ? { width: `${stat}%` }
      : {
          width: fill.interpolate({
            inputRange: [0, stat],
            outputRange: ["0%", `${stat}%`],
            extrapolate: "clamp",
          }),
        };

    useEffect(() => {
      if (currentTab === "Base Stats") {
        if (!animationDone) {
          Animated.timing(fill, {
            toValue: stat,
            duration: 1000,
            useNativeDriver: false,
          }).start(() => setAnimationDone(true));
        }
      }
    }, [currentTab, animationDone]);

    return (
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
        <Text style={{ fontFamily: "CircularStdBold", color: "grey", fontSize: 18, width: 100 }}>{name}</Text>
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, paddingRight: 10 }}>{stat}</Text>
        <View style={{ flex: 1 }}>
          <View style={{ height: 3, backgroundColor: "#dddddd", width: "100%", overflow: "hidden" }} />
          <Animated.View style={{ ...fillStyle, height: 3, backgroundColor: POKEMON_TYPE_COLORS[pokemon.types[0].name], position: "absolute" }} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        {pokemon.stats.map(({ name, base_stat }) => (
          <Stat key={name} name={name} stat={base_stat} />
        ))}
      </View>
      <Text style={{ fontFamily: "CircularStdBold", fontSize: 24 }}>Type Defenses</Text>
      <Text style={{ fontFamily: "CircularStdBold", fontSize: 16, marginTop: 8, color: "grey" }}>
        The effectiveness of each type on {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </Text>
      <TypeEffectiveness pokemon={pokemon} />
    </View>
  );
};

export default BaseStats;
