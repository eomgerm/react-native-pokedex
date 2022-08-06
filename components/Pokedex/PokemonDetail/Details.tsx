import { View, useWindowDimensions } from "react-native";
import Constants from "expo-constants";

const Details = () => {
  const { height } = useWindowDimensions();

  return (
    <View
      style={{
        height: height - (Constants.statusBarHeight + 64),
        backgroundColor: "white",
        paddingHorizontal: 16,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
    >
      <View style={{ width: 50, height: 5, backgroundColor: "#ccc", borderRadius: 2.5, alignSelf: "center", marginVertical: 10 }} />
    </View>
  );
};

export default Details;
