import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";

const Stack = createNativeStackNavigator();

const PokedexStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokedexHome" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default PokedexStack;
