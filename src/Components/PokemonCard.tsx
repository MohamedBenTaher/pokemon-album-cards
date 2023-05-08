import React, { Dispatch, SetStateAction } from "react";
import { makeStyles } from "@mui/styles";

interface Props {
  pokeId: Number|undefined;
  name: string;
}

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    padding: "10px",
  },
  pokemonImage: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  pokemonName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
  }
});

const PokemonCard: React.FC<Props> = ({ pokeId, name }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer} onClick={()=>{}}>
      <img
        className={classes.pokemonImage}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
        alt={name}
      />
      <div className="text-center">
        <p className={classes.pokemonName}>{name}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
