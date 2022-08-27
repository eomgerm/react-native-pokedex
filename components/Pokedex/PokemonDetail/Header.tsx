import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Pokemon from "../../../types/pokemon";
import { useNavigation } from "@react-navigation/native";
import HeaderBase from "../../commons/HeaderBase";
import Pokeball from "../../commons/Pokeball";
import { useEffect, useState } from "react";
import AppColors from "../../../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HeaderProps = {
  pokemon: Pokemon;
  translateY: Animated.Value;
};

const Header = ({ pokemon, translateY }: HeaderProps) => {
  const navigation = useNavigation();

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId = `${pokemon.id}`.padStart(3, "0");

  const fadeStyle = {
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const loadFavouritePokemons = async () => {
    try {
      const favouritePokemonsString = await AsyncStorage.getItem("@favouritePokemons");
      if (favouritePokemonsString !== null) {
        const favouritePokemonsArray = favouritePokemonsString.split(" ");
        setIsFavourite(favouritePokemonsArray.some((id) => pokemon.id.toString() === id));
      } else {
        setIsFavourite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFavouritePokemons();
  }, []);

  const saveFavourite = async () => {
    try {
      if (!isFavourite) {
        const favouritePokemonsString = await AsyncStorage.getItem("@favouritePokemons");
        await AsyncStorage.setItem("@favouritePokemons", favouritePokemonsString + ` ${pokemon.id}`);
      } else {
        const favouritePokemonsString = await AsyncStorage.getItem("@favouritePokemons");
        if (favouritePokemonsString !== null) {
          await AsyncStorage.setItem(
            "@favouritePokemons",
            favouritePokemonsString
              .split(" ")
              .filter((id) => id !== pokemon.id.toString())
              .join(" ")
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePressHeart = () => {
    saveFavourite();
    setIsFavourite(!isFavourite);
  };

  return (
    <>
      <HeaderBase>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressHeart}>
            <AntDesign name={isFavourite ? "heart" : "hearto"} size={21} color={isFavourite ? AppColors.red : "white"} />
          </TouchableOpacity>
        </View>
        <Animated.View style={fadeStyle}>
          <Text style={{ fontFamily: "CircularStdBold", color: "white", fontSize: 24, marginLeft: 7 }}>{pokemonName}</Text>
        </Animated.View>
        <Animated.View style={fadeStyle}>
          <Text style={{ fontFamily: "CircularStdBold", color: "white", fontSize: 16 }}>#{pokemonId}</Text>
        </Animated.View>
      </HeaderBase>
      <Pokeball width={160} height={160} style={{ position: "absolute", right: -40, top: -2, ...fadeStyle }} rotate />
    </>
  );
};

export default Header;
