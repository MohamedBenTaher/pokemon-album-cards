import { all } from "redux-saga/effects";
import { pokemonListWatcherSaga } from "./modules/pokemonList";
import { pokemonSaga } from "./modules/pokemonModal";


export default function* rootSaga():Generator {
  yield all([
    pokemonListWatcherSaga(),
    pokemonSaga()
  ]);
}