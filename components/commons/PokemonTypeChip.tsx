import { StyleSheet, Text, View } from "react-native";

type PokemonTypeChipProps = {
  type: string;
  size: "regular" | "small";
};

const PokemonTypeChip = ({ type, size }: PokemonTypeChipProps) => {
  const baseStyles = StyleSheet.create({
    containerBase: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    textBase: {
      fontFamily: "CircularStdBold",
      color: "white",
    },
  });

  const styles = StyleSheet.create({
    regularContainer: {
      ...baseStyles.containerBase,
      marginRight: 10,
      paddingVertical: 5,
      paddingHorizontal: 25,
    },
    smallContainer: {
      ...baseStyles.containerBase,
      marginBottom: 6,
    },
    regularText: {
      ...baseStyles.textBase,
      fontSize: 16,
    },
    smallText: {
      ...baseStyles.textBase,
      fontSize: 12,
    },
  });

  const isRegular = size == "regular";

  return (
    <View style={isRegular ? styles.regularContainer : styles.smallContainer}>
      <Text style={isRegular ? styles.regularText : styles.smallText}>{type[0].toUpperCase() + type.slice(1)}</Text>
    </View>
  );
};

PokemonTypeChip.defaultProps = {
  size: "regular",
};

export default PokemonTypeChip;
