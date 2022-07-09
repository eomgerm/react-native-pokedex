import { Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AppColors from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MenuListItemProps = {
  text: string;
  icon: React.ReactNode;
  translateX: Animated.Value;
};

const FAB = () => {
  const [open, setOpen] = useState(false);
  const opacity = useMemo(() => new Animated.Value(0), []);
  const { width } = useWindowDimensions();
  const menuItems = [
    {
      text: "Search",
      icon: <Ionicons name="search" size={24} color={AppColors.blue} />,
      translateX: useMemo(() => new Animated.Value(-width), []),
    },
    {
      text: "All Gen",
      icon: <MaterialCommunityIcons name="lightning-bolt" size={24} color={AppColors.blue} />,
      translateX: useMemo(() => new Animated.Value(-width), []),
    },
    {
      text: "All Type",
      icon: <Ionicons name="md-settings-sharp" size={24} color={AppColors.blue} />,
      translateX: useMemo(() => new Animated.Value(-width), []),
    },
    {
      text: "Favourite Pokemon",
      icon: <Ionicons name="heart" size={24} color={AppColors.blue} />,
      translateX: useMemo(() => new Animated.Value(-width), []),
    },
  ];

  const MenuListItem = ({ text, icon, translateX }: MenuListItemProps) => {
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

  const handleToggleMenu = useCallback(() => {
    const translateXArray = open ? menuItems.reverse() : menuItems;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: open ? 0 : 0.35,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.stagger(
        50,
        translateXArray.map((item) =>
          Animated.timing(item.translateX, {
            toValue: open ? -width : 0,
            duration: 200,
            useNativeDriver: true,
          })
        )
      ),
    ]).start();
    setOpen(!open);
  }, [open, opacity, ...menuItems.map((menuItem) => menuItem.translateX)]);

  const styles = StyleSheet.create({
    button: {
      backgroundColor: AppColors.blue,
      width: 65,
      height: 65,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 35,
      shadowColor: AppColors.grey,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
    },
  });

  const overlay = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity,
    zIndex: 50,
  };

  return (
    <>
      <View style={{ zIndex: 100, position: "absolute", bottom: 32, right: 24, alignItems: "flex-end" }}>
        <View style={{ alignItems: "flex-end", flexDirection: "column-reverse" }}>
          {menuItems.map((menuItem) => (
            <MenuListItem key={menuItem.text} text={menuItem.text} icon={menuItem.icon} translateX={menuItem.translateX} />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleToggleMenu}>
          <Ionicons name={open ? "close" : "menu"} size={28} color="white" />
        </TouchableOpacity>
      </View>

      <Animated.View style={overlay} />
    </>
  );
};

export default FAB;
