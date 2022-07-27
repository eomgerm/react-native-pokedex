import { Animated, TouchableOpacity, Text } from "react-native";

type MenuListItemProps = {
  width: number;
  text: string;
  icon: React.ReactNode;
  translateX: Animated.Value;
};

const MenuListItem = ({ width, text, icon, translateX }: MenuListItemProps) => {
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: translateX.interpolate({
              inputRange: [-width, 0],
              outputRange: [-width, 0],
              extrapolate: "clamp",
            }),
          },
        ],
        opacity: translateX.interpolate({
          inputRange: [-width / 3, 0],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 8,
          borderRadius: 20,
          justifyContent: "center",
          marginBottom: 15,
        }}
      >
        <Text style={{ marginRight: 8, fontFamily: "CircularStdMedium", fontSize: 18 }}>{text}</Text>
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MenuListItem;
