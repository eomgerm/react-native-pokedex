import { View, FlatList } from "react-native";
import Constants from "expo-constants";

const Dots = () => {
  const dots = Array.from(Array(15).keys());

  return (
    <View style={{ position: "absolute", top: Constants.statusBarHeight - 28, right: "30%" }}>
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
    </View>
  );
};

export default Dots;
