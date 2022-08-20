export type Pokemon = {
  id: number;
  name: string;
  types: Type[];
  sprites: string;
  genera: string;
  flavor_text: string;
  height: number;
  weight: number;
  gender_rate: number;
  base_experience: number;
  egg_groups: string[];
  stats: Stat[];
};

export type Stat = {
  name: string;
  base_stat: number;
};

export type Type = {
  name: string;
  slot: number;
};

export default Pokemon;
