import { useCallback, useEffect, useMemo } from "react";
import { Image, StyleSheet, Animated, ViewStyle, Easing, RegisteredStyle } from "react-native";
import pokeballImage from "../../assets/pokeball.png";

type PoekballProps = {
  width: number;
  height: number;
  color: string;
  style: RegisteredStyle<ViewStyle> | Animated.WithAnimatedObject<ViewStyle>;
  rotate: boolean;
};

const Pokeball = ({ width, height, color, style, rotate }: PoekballProps) => {
  const pokeballOpacity = useMemo(() => new Animated.Value(0), []);
  const pokeballRotation = useMemo(() => new Animated.Value(0), []);

  const rotatePokeball = useCallback(() => {
    Animated.loop(
      Animated.timing(pokeballRotation, {
        toValue: 360,
        duration: 4500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    rotatePokeball();
  }, [rotatePokeball]);

  const pokeballStyle = {
    transform: [
      {
        rotate: pokeballRotation.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <Animated.View style={[rotate && pokeballStyle, style]}>
      <Image style={{ width, height, tintColor: color }} source={pokeballImage} />
    </Animated.View>
  );
};

Pokeball.defaultProps = {
  color: "rgba(0,0,0, 0.05)",
  style: {},
  rotate: false,
};

export default Pokeball;
