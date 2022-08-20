import { Animated, Easing, Text, View } from "react-native";
import { TabProps } from "../Details";
import { POKEMON_TYPE_COLORS } from "../../../../../data/pokemonTypeColors";
import { useEffect, useMemo } from "react";

const BaseStats = ({ pokemon, currentTab }: TabProps) => {
  type StatProps = {
    name: string;
    stat: number;
  };

  const Stat = ({ name, stat }: StatProps) => {
    const fill = useMemo(() => new Animated.Value(0), []);

    const fillStyle = {
      width: fill.interpolate({
        inputRange: [0, stat],
        outputRange: ["0%", `${stat}%`],
        extrapolate: "clamp",
      }),
    };

    useEffect(() => {
      if (currentTab === "Base Stats") {
        Animated.timing(fill, {
          toValue: stat,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }
    }, [currentTab]);

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
      {pokemon.stats.map(({ name, base_stat }) => (
        <Stat key={name} name={name} stat={base_stat} />
      ))}
    </View>
  );
};

export default BaseStats;
