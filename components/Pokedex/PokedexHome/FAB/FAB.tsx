import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AppColors from "../../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuListItem from "./MenuListItem";

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
      zIndex: 150,
      position: "absolute",
      bottom: 32,
      right: 24,
    },
  });

  const overlay = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity,
    zIndex: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [-1, 150],
      extrapolate: "clamp",
    }),
  };

  return (
    <>
      <Animated.View style={overlay}>
        <Pressable style={{ flex: 1 }} onPress={handleToggleMenu} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 96,
          right: 24,
          alignItems: "flex-end",
          zIndex: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [-1, 150],
            extrapolate: "clamp",
          }),
        }}
      >
        <View style={{ alignItems: "flex-end", flexDirection: "column-reverse" }}>
          {menuItems.map((menuItem) => (
            <MenuListItem key={menuItem.text} width={width} text={menuItem.text} icon={menuItem.icon} translateX={menuItem.translateX} />
          ))}
        </View>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={handleToggleMenu}>
        <Ionicons name={open ? "close" : "menu"} size={28} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default FAB;
