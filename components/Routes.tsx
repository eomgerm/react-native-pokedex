import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Home from "./Home/Home";
import { Provider as PaperProvider } from "react-native-paper";
import Pokedex from "./Pokedex/PokdexStack";
import { Pressable, TouchableOpacity, View, Text } from "react-native";
import { Header, HeaderBackground } from "@react-navigation/elements";

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
              headerShown: false,
              // headerStyle: { backgroundColor: "transparent" },
              // headerTransparent: true,
              // headerBackTitleVisible: false,

              // headerTitle: "",
              // headerRight: () => ,
              // header: () => (
              //   <Header
              //     title=""
              //     headerTransparent={true}
              //     headerLeft={() => (
              //       <Pressable onPress={() => navigation.goBack()}>
              //
              //       </Pressable>
              //     )}
              //     headerBackgroundContainerStyle={{ backgroundColor: "transparent", height: 150 }}
              //   />
              // ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
