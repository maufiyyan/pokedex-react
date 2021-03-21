import { ADD_POKEMON } from "@/js/constants/action-types";

export function addPokemon(payload) {
  return { type: ADD_POKEMON, payload };
}

export function getData() {
  return { type: "DATA_REQUESTED" };
}
