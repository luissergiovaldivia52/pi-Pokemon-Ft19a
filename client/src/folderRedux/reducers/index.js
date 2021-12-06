import {
    GET_ALL_POKEMONS,
     SET_NAME,
  SET_ORDER,
  SET_FILTER,
  SET_PAGE,
  GET_POKEMON,
  REMOVE_TYPE,
  GET_ALL_TYPE,
  FILTER_STATUS,
} from "../actions/pokemonActions";

const initialState = {
  pokemons: [],
  pokemon: [],
  type: [],
  name: "",
  order: "",
  filter: "",
  page: 0,
  size: "",
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_ALL_POKEMONS) {
    return {
      ...state,
      pokemons: action.payload,
    };
  }

  if (action.type === SET_NAME) {
    return {
      ...state,
      name: action.payload,
    };
  }
  if (action.type === SET_PAGE) {
    return {
      ...state,
      page: action.payload,
    };
  }

  if (action.type === SET_ORDER) {
    return {
      ...state,
      order: action.payload,
    };
  }

  if (action.type === SET_FILTER) {
    return {
      ...state,
      size: action.payload.filter,

      pokemon: action.payload.pokemon,
    };
  }

  if (action.type === GET_POKEMON) {
    return {
      ...state,
      pokemon: action.payload,
    };
  }

  if (action.type === REMOVE_TYPE) {
    return {
      ...state,
      pokemon: action.payload,
    };
  }

  if (action.type === GET_ALL_TYPE) {
    return {
      ...state,
      type: action.payload,
    };
  }
  if (action.type === FILTER_STATUS) {
    const newPokemon = state.pokemons.result.filter((c) => {
      return c.status === action.payload;
    });
    return {
      ...state,
      pokemons: {
        ...state.pokemons,
        result: newPokemon,
      },
    };
  }

  return state;
}
