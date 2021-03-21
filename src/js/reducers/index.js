import { ADD_POKEMON } from "../constants/action-types";

const initialState = {
  pokemon: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_POKEMON) {
    return Object.assign({}, state, {
      pokemon: state.pokemon.concat(action.payload)
    });
  }
}

export default rootReducer;
