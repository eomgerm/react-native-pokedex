import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./PokedexHome/Home";
import PokemonDetail from "./PokemonDetail/PokemonDetail";

export type PokedexStackParamsList = {
  PokedexHome: undefined;
  PokemonDetail: undefined;
};

const Stack = createNativeStackNavigator<PokedexStackParamsList>();

const PokedexStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokedexHome" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default PokedexStack;
