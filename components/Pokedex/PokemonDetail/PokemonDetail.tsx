import { RouteProp, useRoute } from "@react-navigation/native";
import { Animated, View } from "react-native";
import { POKEMON_TYPE_COLORS } from "../../../data/pokemonTypeColors";
import { PokedexStackParamsList } from "../PokdexStack";
import Header from "./Header";
import Main from "./Main";
import Block from "./Block";
import Dots from "./Dots";
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from "react-native-gesture-handler";
import Details from "./Details";

const PokemonDetail = () => {
  const route = useRoute<RouteProp<PokedexStackParamsList, "PokemonDetail">>();
  const {
    params: { pokemon },
  } = route;

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;

      const { translationY } = event.nativeEvent;

      if (translationY < -60) {
        opened = true;
      } else {
        opened = false;
        translateY.flattenOffset();
      }

      Animated.timing(translateY, {
        toValue: opened ? -365 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        translateY.extractOffset();
      });
    }
  };

  const detailsStyle = {
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [-365, 0, 200],
          outputRange: [-365, 0, 50],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <View style={{ backgroundColor: POKEMON_TYPE_COLORS[pokemon.types[0].type.name], flex: 1 }}>
      <Dots translateY={translateY} />
      <Block />
      <Header pokemon={pokemon} translateY={translateY} />
      <Main pokemon={pokemon} translateY={translateY} />

      <PanGestureHandler onHandlerStateChange={onHandlerStateChange} onGestureEvent={animatedEvent}>
        <Animated.View style={{ flex: 1, position: "relative", ...detailsStyle }}>
          <Details />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default PokemonDetail;
