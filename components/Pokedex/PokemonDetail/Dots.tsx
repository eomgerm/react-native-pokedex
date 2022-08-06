import { View, FlatList, Animated, ViewProps, RegisteredStyle, ViewStyle } from "react-native";
import Constants from "expo-constants";

type DotsProps = {
  translateY: Animated.Value;
};

const Dots = ({ translateY }: DotsProps) => {
  const dots = Array.from(Array(15).keys());

  const fadeStyle = {
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  return (
    <Animated.View style={{ position: "absolute", top: Constants.statusBarHeight - 28, right: "30%", ...fadeStyle }}>
      <FlatList
        data={dots}
        numColumns={5}
        renderItem={({ item: dot }) => (
          <View
            key={dot}
            style={{ width: 6, height: 6, backgroundColor: "rgba(255, 255, 255, 0.2)", marginLeft: 8, marginTop: 10, borderRadius: 3 }}
          />
        )}
      />
    </Animated.View>
  );
};

export default Dots;
