import { Text, useWindowDimensions, View } from "react-native";
import Pokemon from "../../../../../types/pokemon";
import { Foundation } from "@expo/vector-icons";
import AppColors from "../../../../../styles/colors";

type AboutProps = {
  pokemon: Pokemon;
};

const About = ({ pokemon }: AboutProps) => {
  const { width } = useWindowDimensions();

  const getPokemonGender = () => {
    if (pokemon.gender_rate === -1) {
      return [{ gender: "genderless", rate: -1 }];
    }
    const femaleRate = (pokemon.gender_rate / 8) * 100;
    const maleRate = 100 - femaleRate;

    return [
      { gender: "female", rate: femaleRate },
      { gender: "male", rate: maleRate },
    ];
  };

  return (
    <View>
      <Text style={{ fontFamily: "CircularStdBook", fontSize: 18, marginBottom: 25 }}>{pokemon.flavor_text}</Text>
      <View
        style={{
          shadowOffset: { width: 5, height: 8 },
          shadowColor: "black",
          shadowOpacity: 0.15,
          shadowRadius: 15,
          backgroundColor: "white",
          width: width - 54,
          borderRadius: 20,
          padding: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <View>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "grey", marginBottom: 3 }}>Height</Text>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 22 }}>
            {pokemon.height}m({(pokemon.height * 3.281).toFixed(2)}ft)
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "grey", marginBottom: 3 }}>Weight</Text>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 22 }}>
            {pokemon.weight}kg({(pokemon.weight * 2.205).toFixed(2)}lbs)
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 27, marginBottom: 12 }}>Breeding</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "grey", width: 100 }}>Gender</Text>
          {getPokemonGender().map((gender) =>
            gender.gender === "genderless" ? (
              <Text style={{ fontFamily: "CircularStdBold", fontSize: 18 }} key={gender.gender}>
                Genderless
              </Text>
            ) : (
              <View key={gender.gender} style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>
                <Foundation
                  name={gender.gender == "male" ? "male-symbol" : "female-symbol"}
                  size={18}
                  color={gender.gender == "male" ? AppColors.blue : AppColors.pink}
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontFamily: "CircularStdBold", fontSize: 18 }}>{gender.rate}%</Text>
              </View>
            )
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "grey", width: 100 }}>Egg Groups</Text>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18 }}>
            {pokemon.egg_groups.map((group) => group[0].toUpperCase() + group.slice(1) + "  ")}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 27, marginBottom: 12 }}>Training</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, color: "grey", width: 100 }}>Base EXP</Text>
          <Text style={{ fontFamily: "CircularStdBold", fontSize: 18 }}>{pokemon.base_experience}</Text>
        </View>
      </View>
    </View>
  );
};

export default About;
