import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { State as RootState } from '../src/redux/modules/pokemonList';
import { loadPokemonList, loadMorePokemon } from '../src/redux/modules/pokemonList';
import PokemonList from '../src/Components/PokemonList';
import { Store, legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';

type MockStoreType<T> = {
  getState: () => T;
  dispatch: jest.Mock<any, any>;
  subscribe: jest.Mock<any, any>;
  replaceReducer: jest.Mock<any, any>;
};

export const mockStore = (initialState: RootState): MockStoreType<RootState> => {
  const sagaMiddleware = createSagaMiddleware();
  const store: Store = createStore(
    combineReducers({
      ...rootReducer,
    }),
    initialState,
    applyMiddleware(sagaMiddleware),
  );
  return {
    ...(store as any),
    dispatch: jest.fn(),
  };
};

type State = {
  pokemonListReducer: {
    isLoading: boolean;
    error: string | null;
    pokemonList: any[];
  };
  
};
describe('PokemonList', () => {
  const sagaMiddleware = createSagaMiddleware();
  const mockStore = configureStore<State, any>([sagaMiddleware]);

  let store: MockStoreEnhanced<State, any>;

  beforeEach(() => {
    store = mockStore({
      pokemonListReducer: {
        isLoading: false,
        error: null,
        pokemonList: [],
      },
    });
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );
  });

  it('should dispatch loadPokemonList on mount', () => {
    const spy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(loadPokemonList());
  });

  it('should dispatch loadMorePokemon when "Load more" button is clicked', () => {
    const spy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    fireEvent.click(screen.getByText('Load more'));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(loadMorePokemon({ offset: 20, limit: 20 }));
  });

  it('should render a loading skeleton when isLoading is true', () => {
    store = mockStore({
      pokemonListReducer: {
        isLoading: true,
        error: null,
        pokemonList: [],
      },
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('should render an error message when error is not null', () => {
    store = mockStore({
      pokemonListReducer: {
        isLoading: false,
        error: 'Error message',
        pokemonList: [],
      },
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText('Error: Error message')).toBeInTheDocument();
  });

  it('should render a list of Pokemon cards when pokemonList is not empty', () => {
    store = mockStore({
      pokemonListReducer: {
        isLoading: false,
        error: null,
        pokemonList: [
          { url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'bulbasaur' },
          { url: 'https://pokeapi.co/api/v2/pokemon/2/', name: 'ivysaur' },
          { url: 'https://pokeapi.co/api/v2/pokemon/3/', name: 'venusaur' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getAllByTestId('pokemon-card')).toHaveLength(3);
  });
});
