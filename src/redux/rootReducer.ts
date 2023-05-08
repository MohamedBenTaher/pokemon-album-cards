import { combineReducers } from "redux";
import pokemonListReducer from "./modules/pokemonList";
import { pokemonReducer } from "./modules/pokemonModal";
const rootReducer = combineReducers({
  pokemonListReducer,
  pokemonReducer
});

export default rootReducer;