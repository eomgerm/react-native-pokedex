import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-paper";

const NewsCard = () => {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <View>
          <Text style={styles.titleText}>{"Pokemon Rumble Rush\nArrives Soon"}</Text>
          <Text style={styles.titleText}>23 June 2022</Text>
        </View>
        <Image source={{ uri: "https://picsum.photos/300/200" }} style={styles.image} />
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "CircularStdBold",
    fontSize: 18,
    marginBottom: 8,
  },
  dateText: {
    fontFamily: "CircularStdBold",
    color: "grey",
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 20,
  },
});

export default NewsCard;
