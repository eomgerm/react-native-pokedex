import { useEffect, useState } from "react";
import PokemonApiResult from "../../../../../../types/pokemon_api_result";
import axios from "axios";
import PokemonTypeEffectiveness from "../../../../../../types/pokemon_type";
import { POKEMON_TYPE_COLORS } from "../../../../../../data/pokemonTypeColors";
import { View, Text } from "react-native";
import Pokemon from "../../../../../../types/pokemon";

type TypeEffectivenessProps = {
  pokemon: Pokemon;
};

const TypeEffectiveness = ({ pokemon }: TypeEffectivenessProps) => {
  type TypeEffectiveness = {
    type: string;
    effectiveness: string;
  };

  const [typeEffectiveness, setTypeEffectiveness] = useState<TypeEffectiveness[]>([]);

  const loadTypeEffectiveness = async () => {
    const { data: allTypesData } = await axios.get<PokemonApiResult>("https://pokeapi.co/api/v2/type/");
    const { data: typeEffectivenessData } = await axios.get<PokemonTypeEffectiveness>(`https://pokeapi.co/api/v2/type/${pokemon.types[0].name}`);

    const {
      damage_relations: { double_damage_to, half_damage_to, no_damage_to },
    } = typeEffectivenessData;

    let typeEffectiveness: TypeEffectiveness[] = [];
    const double = double_damage_to.map((type) => ({ type: type.name, effectiveness: "x2" }));
    const half = half_damage_to.map((type) => ({ type: type.name, effectiveness: "x0.5" }));
    const no = no_damage_to.map((type) => ({ type: type.name, effectiveness: "x0" }));

    typeEffectiveness = [...double, ...half, ...no];

    const { results: allTypes } = allTypesData;
    const leftTypes = allTypes.filter(({ name }) => !typeEffectiveness.some((effect) => name === effect.type));
    leftTypes.splice(leftTypes.length - 2);
    const normal = leftTypes.map(({ name }) => ({ type: name, effectiveness: "x1" }));

    typeEffectiveness = [...typeEffectiveness, ...normal];
    setTypeEffectiveness(typeEffectiveness);
  };

  useEffect(() => {
    loadTypeEffectiveness();
  }, []);

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 15 }}>
      {typeEffectiveness.map((effect) => (
        <View
          key={effect.type}
          style={{
            paddingHorizontal: 20,
            backgroundColor: `${POKEMON_TYPE_COLORS[effect.type]}40`,
            paddingVertical: 5,
            marginRight: 10,
            marginBottom: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontFamily: "CircularStdMedium", fontSize: 16, color: POKEMON_TYPE_COLORS[effect.type] }}>
            {effect.type[0].toUpperCase() + effect.type.slice(1)} {effect.effectiveness}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default TypeEffectiveness;
