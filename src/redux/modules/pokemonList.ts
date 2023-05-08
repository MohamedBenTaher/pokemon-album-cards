import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getPokemonList,loadMorePokemonList } from "../../api/pokemonEndpoints";

const FETCH_POKEMON_LIST = "FETCH_POKEMON_LIST";
const FETCH_POKEMON_LIST_SUCCESS =
  "FETCH_POKEMON_LIST_SUCCESS";
const FETCH_POKEMON_LIST_FAILURE =
  "FETCH_POKEMON_LIST_SUCCESS";
const LOAD_MORE_POKEMON = "FETCH_POKEMON_LIST_FAILURE";
const LOAD_MORE_POKEMON_SUCCEED =
  "LOAD_MORE_POKEMON_SUCCEED";
const LOAD_MORE_POKEMON_FAILED =
  "LOAD_MORE_POKEMON_FAILED";


  export interface State {
    pokemonList: Pokemon[];
    isLoading: boolean;
    error: string;
  }
   interface Pokemon {
    name: string;
    url: string;
  }
  
  
  interface Action {
    type: string;
    payload?: {
      data: {
        results: Pokemon[];
      };
      error: string;
    };
  }
  
  export const initialState:State  = { pokemonList: [], isLoading: false, error: "" };

  export default function reducer(state :State = initialState, action :Action={type:''}): State{
    console.log('called reducer',state,action)
    switch (action.type) {
      case FETCH_POKEMON_LIST:
        return {
          ...state,
          isLoading: true,
        };
      case FETCH_POKEMON_LIST_SUCCESS:
        return {
          ...state,
          pokemonList: action.payload!.data.results,
          isLoading: false,
        };
      case FETCH_POKEMON_LIST_FAILURE:
        return {
          ...state,
          error: action.payload!.error,
          isLoading: false,
        };
      case LOAD_MORE_POKEMON:
        return {
          ...state,
          isLoading: true,
        };
      case LOAD_MORE_POKEMON_SUCCEED:
        const newPokemonList = action.payload!.data.results;
        const { pokemonList } = state;
        return {
          ...state,
          pokemonList: [...pokemonList, ...newPokemonList],
          isLoading: false,
        };
      case LOAD_MORE_POKEMON_FAILED:
        return {
          ...state,
          error: action.payload!.error,
          isLoading: false,
        };
      default:
        return state;
    }
  }
  interface Pokemon {
    name: string;
    url: string;
  }
  
  interface LoadPokemonListAction {
    type: typeof FETCH_POKEMON_LIST;
  }
  
  interface LoadPokemonListSucceedAction {
    type: typeof FETCH_POKEMON_LIST_SUCCESS;
    payload: {
      data: {
        results: Pokemon[];
      };
    };
  }
  
  interface LoadPokemonListFailedAction {
    type: typeof FETCH_POKEMON_LIST_FAILURE;
    payload: {
      error: string;
    };
  }
  
  interface LoadMorePokemonAction {
    type: typeof LOAD_MORE_POKEMON;
    payload: {
      offset: number;
      limit: number;
    };
  }
  
  interface LoadMorePokemonSucceedAction {
    type: typeof LOAD_MORE_POKEMON_SUCCEED;
    payload: {
      data: {
        results: Pokemon[];
      };
    };
  }
  
  interface LoadMorePokemonFailedAction {
    type: typeof LOAD_MORE_POKEMON_FAILED;
    payload: {
      error: string;
    };
  }
  type PokemonAction =
  | LoadPokemonListAction
  | LoadPokemonListSucceedAction
  | LoadPokemonListFailedAction
  | LoadMorePokemonAction
  | LoadMorePokemonSucceedAction
  | LoadMorePokemonFailedAction;

export function loadPokemonList(): LoadPokemonListAction {
  console.log('CALLED FETCH')
  return { type: FETCH_POKEMON_LIST };
}

export function loadPokemonListSucceed(payload:any): any {
    console.log('payoad',payload)
  return { type: FETCH_POKEMON_LIST_SUCCESS, payload };
}

export function loadPokemonListFailed(payload: LoadPokemonListFailedAction["payload"]): LoadPokemonListFailedAction {
  return { type: FETCH_POKEMON_LIST_FAILURE, payload };
}

export function loadMorePokemon(payload: LoadMorePokemonAction["payload"]): LoadMorePokemonAction {
  return { type: LOAD_MORE_POKEMON, payload };
}

export function loadMorePokemonSucceed(payload: LoadMorePokemonSucceedAction["payload"]): LoadMorePokemonSucceedAction {
  return { type: LOAD_MORE_POKEMON_SUCCEED, payload };
}

export function loadMorePokemonFailed(payload: LoadMorePokemonFailedAction["payload"]): LoadMorePokemonFailedAction {
  return { type: LOAD_MORE_POKEMON_FAILED, payload };
}
export function* fetchPokemonListSaga(): Generator {
    try {
      console.log('called fetch saga')
      console.log('called fetch saga--------------------------------------')
      const response = yield call(getPokemonList);
      yield put(loadPokemonListSucceed(response));
    } catch (error:any) {
      yield put(loadPokemonListFailed(error.message));
    }
  }
  
  export function* loadMorePokemonListSaga(action:Action): Generator {
    const { payload } = action;
    try {
      const response:any = yield call(loadMorePokemonList, payload);
      yield delay(4000);
      yield put(loadMorePokemonSucceed(response));
    } catch (error: any) {
      yield put(loadMorePokemonFailed(error.message));
    }
  }
  
  export function* pokemonListWatcherSaga() {
    console.log('called watcher')
    yield takeLatest(FETCH_POKEMON_LIST, fetchPokemonListSaga);
    yield takeEvery(LOAD_MORE_POKEMON, loadMorePokemonListSaga); 
  }