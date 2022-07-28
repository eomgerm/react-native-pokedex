import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Pokemon from "../../types/pokemon";
import Home from "./PokedexHome/Home";
import PokemonDetail from "./PokemonDetail/PokemonDetail";

export type PokedexStackParamsList = {
  PokedexHome: undefined;
  PokemonDetail: { pokemon: Pokemon };
};

const Stack = createSharedElementStackNavigator<PokedexStackParamsList>();

const PokedexStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokedexHome" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetail}
        options={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
        sharedElements={(route) => {
          return [`${route.params.pokemon.id}`];
        }}
      />
    </Stack.Navigator>
  );
};

export default PokedexStack;
