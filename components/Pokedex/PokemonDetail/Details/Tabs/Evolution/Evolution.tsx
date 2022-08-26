import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import EvolutionChain from "../../../../../../types/pokemon_evolution_chain";
import { TabProps } from "../../Details";
import PokemonRaw from "../../../../../../types/pokemon_raw";
import PokemonSpecie from "../../../../../../types/pokemon_speice";
import EvolutionSection from "./EvolutionSection";
import Loading from "../../../../../commons/Loading";

const Evolution = ({ pokemon }: TabProps) => {
  type EvolutionChainObject = {
    baseForm: EvolutionInfo;
    firstEvolution: EvolutionInfo;
    secondEvolution?: EvolutionInfo;
  };

  type EvolutionInfo = {
    name: string;
    min_level: number;
    image: string;
  };

  const [evolutionChain, setEvolutionChain] = useState<EvolutionChainObject>();
  const [loading, setLoading] = useState<boolean>(true);

  const loadEvolutionChain = useCallback(async () => {
    const {
      data: {
        evolution_chain: { url: evolutionChainUrl },
      },
    } = await axios.get<PokemonSpecie>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);

    const {
      data: { chain },
    } = await axios.get<EvolutionChain>(evolutionChainUrl);

    //baseForm
    const {
      data: {
        sprites: {
          other: {
            "official-artwork": { front_default: baseFormImage },
          },
        },
      },
    } = await axios.get<PokemonRaw>(`https://pokeapi.co/api/v2/pokemon/${chain.species.name}`);

    const baseForm = {
      name: chain.species.name,
      min_level: 0,
      image: baseFormImage,
    };

    //firstEvolution
    const {
      data: {
        sprites: {
          other: {
            "official-artwork": { front_default: image },
          },
        },
      },
    } = await axios.get<PokemonRaw>(`https://pokeapi.co/api/v2/pokemon/${chain.evolves_to[0].species.name}`);

    const firstEvolution = {
      name: chain.evolves_to[0].species.name,
      min_level: chain.evolves_to[0].evolution_details[0].min_level,
      image,
    };

    setEvolutionChain({ baseForm, firstEvolution });

    //secondEvolution
    if (chain.evolves_to[0].evolves_to.length !== 0) {
      const { evolves_to } = chain.evolves_to[0];

      const {
        data: {
          sprites: {
            other: {
              "official-artwork": { front_default: image },
            },
          },
        },
      } = await axios.get<PokemonRaw>(`https://pokeapi.co/api/v2/pokemon/${evolves_to[0].species.name}`);

      const secondEvolution = {
        name: evolves_to[0].species.name,
        min_level: evolves_to[0].evolution_details[0].min_level,
        image,
      };

      setEvolutionChain({ baseForm, firstEvolution, secondEvolution });
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadEvolutionChain();
  }, []);

  const NoContent = useCallback(() => {
    if (loading) {
      return <Loading />;
    }

    return <Text style={{ fontFamily: "CircularStdBold", fontSize: 18 }}>No evolution chian 😢</Text>;
  }, []);

  return (
    <View>
      <Text style={{ fontFamily: "CircularStdBold", fontSize: 24 }}>Evolution Chain</Text>
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        {evolutionChain?.firstEvolution ? (
          <View>
            {
              <EvolutionSection
                fromName={evolutionChain.baseForm.name}
                fromImage={evolutionChain.baseForm.image}
                level={evolutionChain.firstEvolution.min_level}
                toName={evolutionChain.firstEvolution.name}
                toImage={evolutionChain.firstEvolution.image}
              />
            }
            {evolutionChain.secondEvolution && (
              <EvolutionSection
                fromName={evolutionChain.firstEvolution.name}
                fromImage={evolutionChain.firstEvolution.image}
                level={evolutionChain.secondEvolution.min_level}
                toName={evolutionChain.secondEvolution.name}
                toImage={evolutionChain.secondEvolution.image}
              />
            )}
          </View>
        ) : (
          <NoContent />
        )}
      </View>
    </View>
  );
};

export default Evolution;
