import { View, Image, Text } from "react-native";
import Pokeball from "../../../../../commons/Pokeball";
import capitalizeFirstLetter from "../../../../../../utils/capitalizeFirstLetter";
import { AntDesign } from "@expo/vector-icons";

type EvolutionSectionProps = {
  fromName: string;
  fromImage: string;
  level: number;
  toName: string;
  toImage: string;
};

const EvolutionSection = ({ fromName, fromImage, level, toName, toImage }: EvolutionSectionProps) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
      <View style={{ alignItems: "center" }}>
        <Pokeball width={100} height={100} />
        <Image source={{ uri: fromImage }} style={{ width: 80, height: 80, position: "absolute", left: 10, top: 10 }} />
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, marginTop: 5 }}>{capitalizeFirstLetter(fromName)}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <AntDesign name="arrowright" size={24} color="#cccccc" style={{ marginBottom: 5 }} />
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 18 }}>Level {level}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Pokeball width={100} height={100} />
        <Image source={{ uri: toImage }} style={{ width: 80, height: 80, position: "absolute", left: 10, top: 10 }} />
        <Text style={{ fontFamily: "CircularStdBold", fontSize: 18, marginTop: 5 }}>{capitalizeFirstLetter(toName)}</Text>
      </View>
    </View>
  );
};

export default EvolutionSection;
