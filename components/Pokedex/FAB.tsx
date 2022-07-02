import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useState } from "react";

const FAB = () => {
  const [open, setOpen] = useState(false);
  const opacity = useMemo(() => new Animated.Value(0), []);

  const handleToggleMenu = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: open ? 0 : 0.35,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setOpen(!open);
  }, [open, opacity]);

  return (
    <>
      <View style={{ zIndex: 100, position: "absolute", bottom: 32, right: 24, alignItems: "flex-end" }}>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ marginRight: 8, fontFamily: "CircularStdMedium", fontSize: 22 }}>Search</Text>
          <Ionicons name="search" size={26} color={AppColors.blue} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleToggleMenu}>
          <Ionicons name={open ? "close" : "menu"} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }} />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.blue,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: AppColors.grey,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});

export default FAB;
