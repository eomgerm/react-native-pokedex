import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Home from "./Home/Home";
import { Provider as PaperProvider } from "react-native-paper";
import Pokedex from "./Pokedex/PokdexStack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export type RootStackParamsList = {
  Home: undefined;
  Pokedex: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

const Routes = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen
              name="Pokedex"
              component={Pokedex}
              options={{
                animation: "fade",
                customAnimationOnGesture: true,
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default Routes;
