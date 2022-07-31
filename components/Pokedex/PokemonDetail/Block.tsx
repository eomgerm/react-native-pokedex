import { View } from "react-native";

const Block = () => {
  return (
    <View
      style={{
        position: "absolute",
        left: -110,
        top: -95,
        width: 212,
        height: 212,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 24,
        transform: [{ rotate: "-12deg" }],
      }}
    />
  );
};

export default Block;
