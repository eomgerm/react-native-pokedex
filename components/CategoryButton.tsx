import { CommonActions } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Category } from "../data/categories";
import { HomeScreenProps } from "./Home/Home";

type CategoryButtonProps = {
  width: number;
  category: Category;
  navigation: HomeScreenProps;
};

const CategoryButton = ({ width, category, navigation }: CategoryButtonProps) => {
  const styles = StyleSheet.create({
    categroyButton: {
      backgroundColor: category.color,
      borderRadius: 20,
      justifyContent: "center",
      overflow: "hidden",
      width: (width - 50) / 2,
      height: 80,
      marginBottom: 10,
    },
    circle: {
      width: 80 * 1.03,
      height: 80 * 1.03,
      borderRadius: 40 * 1.03,
      position: "absolute",
      top: -80 * 0.616,
      left: -80 * 0.53,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    pokeballDecoration: {
      width: 80 * 1.388,
      height: 80 * 1.388,
      position: "absolute",
      top: -80 * 0.16,
      right: -80 * 0.25,
      tintColor: "rgba(255, 255, 255, 0.14)",
    },
  });

  const onPress = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: category.name,
      })
    );
  };

  return (
    <View style={{ shadowOffset: { width: 0, height: 10 }, shadowColor: category.color, shadowOpacity: 0.4, shadowRadius: 8 }}>
      <TouchableOpacity style={styles.categroyButton} onPress={onPress}>
        <View style={styles.circle} />
        <Text style={{ color: "white", fontFamily: "CircularStdBold", marginLeft: 20, fontSize: 20 }}>{category.name}</Text>
        <Image style={styles.pokeballDecoration} source={require("../assets/pokeball.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default CategoryButton;
