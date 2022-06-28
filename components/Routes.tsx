import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Home from "./Home/Home";
import { Provider as PaperProvider } from "react-native-paper";
import Pokedex from "./Pokedex/PokdexStack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export type RootStackProps = {
  Home: undefined;
  Pokedex: undefined;
};

const Stack = createNativeStackNavigator<RootStackProps>();

const Routes = () => {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen
            name="Pokedex"
            component={Pokedex}
            options={({ navigation }) => ({
              animation: "fade",
              customAnimationOnGesture: true,
              headerStyle: { backgroundColor: "transparent" },
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerLeft: () => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
              ),
              headerTitle: "",
              headerRight: () => <Ionicons name="menu" size={24} color="black" />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
