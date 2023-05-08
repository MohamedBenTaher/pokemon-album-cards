
import './App.css'
import { Provider } from "react-redux"
import configureStore from "../src/redux/configureStore";
import PokemonList from '../src/Components/PokemonList';

const store = configureStore();
function App() {

  return (
       <Provider store={store}>
          <h1>Pokemon Cards</h1>
          <PokemonList/>
  
       </Provider>
  )
}

export default App
