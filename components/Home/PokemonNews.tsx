import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppColors from "../../styles/colors";
import NewsCard from "./NewsCard";

const PokemonNews = () => {
  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.pokenews}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 24 }}>Pokémon News</Text>
        <TouchableOpacity>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: AppColors.blue }}>View All</Text>
        </TouchableOpacity>
      </View>
      <View>
        {temp.map((_, index) => (
          <NewsCard key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f5f5f5",
  },
  pokenews: {
    flex: 1,
    paddingVertical: 30,
  },
});

export default PokemonNews;
