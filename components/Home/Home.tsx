import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import AppColors from "../../styles/colors";
import HeaderCategory from "./HeaderCategory";
import PokemonNews from "./PokemonNews";
import { useRef } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackProps } from "../Routes";

export type HomeScreenProps = NativeStackNavigationProp<RootStackProps, "Home">;

type Props = {
  navigation: HomeScreenProps;
};

const Home = ({ navigation }: Props) => {
  const { width } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [350, 500],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <>
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 1000,
            position: "absolute",
            top: -1000,
            left: 0,
            right: 0,
          }}
        />
        <HeaderCategory navigation={navigation} />
        <PokemonNews />
      </Animated.ScrollView>
      <Animated.View
        style={{
          backgroundColor: AppColors.red,
          paddingTop: 65,
          paddingBottom: 15,
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          zIndex: 100,
          position: "absolute",
          top: 0,
          left: 0,
          width,
          opacity: headerOpacity,
        }}
      >
        <Animated.Text style={{ fontFamily: "CircularStdBlack", fontSize: 24, color: "white" }}>Pokedex</Animated.Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f5f5f5",
  },
});

export default Home;
