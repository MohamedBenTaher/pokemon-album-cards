import React, { useState, useEffect ,useRef} from "react";
import { connect,useDispatch, useSelector } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { loadPokemonList, loadMorePokemon } from "../redux/modules/pokemonList";
import PokemonCard from "./PokemonCard";
import { Grid } from "@mui/material";
import PokemonInfo from "./PokemonInfo";
import LoadingSkeleton from "./LoadingSkeleton";
import { loadPokemonInfo } from "../redux/modules/pokemonModal";


interface Props {
  isLoading: boolean;
  error: string;
  pokemonList: any[];
  fetchActionCreator: () => void;
  loadMoreActionCreator: (payload: { offset: number; limit: number }) => void;
}
export const getId = (url:string) => {
  return url
    .split("/")
    .filter(el => !!el)
    .pop();
};
interface Pokemon {
    id: Number|undefined;
    name: string;
  }

const PokemonList: React.FC<Props> = ({
  isLoading,
  error,
  pokemonList,
  fetchActionCreator,
  loadMoreActionCreator,
}) => {
  const [currentCount, setCurrentCount] = useState(20);
  const dispatch = useDispatch()
  useEffect(() => {
    fetchActionCreator();
  }, [fetchActionCreator]);

  const handleLoadMore = () => {
    loadMoreActionCreator({
      offset: currentCount,
      limit: 20,
    });
    setCurrentCount(currentCount + 20);
    console.log(currentCount)
  };
  
  const handleScroll = (event:any) => {
    const element = event?.target;
    if (element?.scrollHeight - element?.scrollTop === element?.clientHeight) {
      handleLoadMore()
    }
  };
 console.log(pokemonList)
 if (!pokemonList.length && isLoading) return <LoadingSkeleton />;
  return (
    <><Grid
      container
      spacing={2}
      className="row"
      onScroll={handleScroll}
      style={{ height: "800px", overflow: "auto", width: '100%' }}
      data-testid={"pokemon-card"}
    >

      {error && <p>Error: {error}</p>}
      {pokemonList.map((pokemon,index) => {
        const { url, name } = pokemon;
        const id = getId(url)?.toString();
        return (
          // <div key={pokemon.name}>{pokemon.name}</div>
          <Grid item xs={4} key={index}>
            <div key={name} onClick={() => {
              dispatch(loadPokemonInfo(Number(id)));
            } }><PokemonCard name={name} pokeId={Number(id)} /></div>
          </Grid>

        );
      })}
       <PokemonInfo />
      </Grid>
      {isLoading && (<LoadingSkeleton />)}
    <Grid width={'100%'} ><button onClick={handleLoadMore}>Load more</button></Grid>
   </>
  );
};

const mapStateToProps = (state: any) => ({
  isLoading: state.pokemonListReducer.isLoading,
  error: state.pokemonListReducer.error,
  pokemonList: state.pokemonListReducer.pokemonList,
});

const mapDispatchToProps = (dispatch:Dispatch) => {
  return bindActionCreators(
    {
      fetchActionCreator: loadPokemonList,
      loadMoreActionCreator: loadMorePokemon,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);