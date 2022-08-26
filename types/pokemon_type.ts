import { Result } from "./pokemon_api_result";

export type PokemonTypeEffectiveness = {
  damage_relations: {
    double_damage_to: Result[];
    half_damage_to: Result[];
    no_damage_to: Result[];
  };
};

export default PokemonTypeEffectiveness;
