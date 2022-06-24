import App from "../App";
import AppColors from "../styles/colors";

export type Category = {
  name: string;
  color: string;
};

export const categories: Category[] = [
  {
    name: "Pokedex",
    color: AppColors.teal,
  },
  {
    name: "Moves",
    color: AppColors.red,
  },
  {
    name: "Abilities",
    color: AppColors.blue,
  },
  {
    name: "Items",
    color: AppColors.yellow,
  },
  {
    name: "Locations",
    color: AppColors.purple,
  },
  {
    name: "Type Effects",
    color: AppColors.brown,
  },
];
