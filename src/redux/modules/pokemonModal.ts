import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { getPokemonInfo } from '../../api/pokemonEndpoints';

// Define constants
const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';
const RESET_POKEMON='RESET_POKEMON'
export interface PokemonState {
  id: number;
  name: string;
  url: string;
  weight:'';
  height:'';
  order:'';
  abilities:Array<object>,
  showModal: boolean;
  loading: boolean;
  error: boolean;
}

interface FetchPokemonRequestAction {
  type: typeof FETCH_POKEMON_REQUEST;
  payload: {
    id: number;
  };
}

interface FetchPokemonSuccessAction {
  type: typeof FETCH_POKEMON_SUCCESS;
  payload: {
    order: "";
    weight: "";
    height: "";
    abilities: object[];
    name: string;
    url: string;
  };
}

interface FetchPokemonFailureAction {
  type: typeof FETCH_POKEMON_FAILURE;
}
interface resetModalAction {
    type: typeof RESET_POKEMON;
  }
export function loadPokemonInfo(payload:number) {
    console.log('CALLED FETCH')
    return { type: FETCH_POKEMON_REQUEST,payload };
  }
  
  export function loadPokemonInfoSucceed(payload:any): any {
      console.log('paload',payload)
    return { type: FETCH_POKEMON_SUCCESS, payload };
  }
  
  export function loadPokemonInfoFailed(payload:any): any {
    console.log('fetch failed for 1 poke',payload)
    return { type: FETCH_POKEMON_FAILURE, payload };
  }
  export function resetModal(): any {
    console.log('RESET',)
    return { type: RESET_POKEMON };
  }
  

type PokemonActionTypes =
  | FetchPokemonRequestAction
  | FetchPokemonSuccessAction
  | FetchPokemonFailureAction
  | resetModalAction;

// Define initial state
const initialState: PokemonState = {
  id: 0,
  name: '',
  url: '',
  weight:'',
  height:'',
  order:'',
  abilities:[],
  showModal: false,
  loading: false,
  error: false,
};

// Define reducer
export const pokemonReducer = (state = initialState, action: PokemonActionTypes): PokemonState => {
  switch (action.type) {
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        id: action?.payload?.id,
        showModal: true,
        loading: true,
        error: false,
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        url: action.payload.url,
        order:action.payload.order,
        weight:action.payload.weight,
        height:action.payload.height,
        abilities:action.payload.abilities,
        loading: false,
        error: false,
      };
    case FETCH_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case RESET_POKEMON:
        console.log('reached reset in reducer')
        return {
            ...state,
             name:'',
             url:'',
             showModal: false,
             loading: false,
             error: false,
        };
    default:
      return state;
  }
};

// Define sagas
function* fetchPokemon(action: FetchPokemonRequestAction) :Generator {
  try {
    const pokeId=Number(action.payload)
    console.log('calledid ',pokeId)
    const response :any= yield call(getPokemonInfo,pokeId);
    const  url= response.data.sprites.front_default;
    const {name,id,weight,height,order,abilities}=response.data
    yield put({
      type: FETCH_POKEMON_SUCCESS,
      payload: {
        id,
        name,
        url,
        weight,
        height,
        order,
        abilities
      },
    });
  } catch (error) {
    console.log('fetch poke error',error)
    yield put({ type: FETCH_POKEMON_FAILURE });
  }
}

export function* pokemonSaga() {
  yield takeLatest(FETCH_POKEMON_REQUEST, fetchPokemon);
  yield takeEvery(RESET_POKEMON,resetModal)
}