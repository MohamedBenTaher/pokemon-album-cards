import { Modal, Backdrop, Fade, Box, Typography, Grid, List, ListItem ,ListItemText } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import style from 'styled-jsx/style'
import { makeStyles } from "@mui/styles";
import { useSelector,useDispatch } from 'react-redux';
import { PokemonState, resetModal } from '../redux/modules/pokemonModal';
import ModalSkeleton from './ModalSekeleton';
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
      width: "100%",
      height: "100%",
      objectFit: "contain",
      marginBottom: "10px",
      backgroundColor:'white',
      borderRadius:'16px'
    },
    pokemonName: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "10px",
    },
    listItemText: {
      color: "#fff",
    },
  });
const PokemonInfo = () => {
    const classes = useStyles();
    const dispatch=useDispatch()
    const pokemonInfo = useSelector((state: any) => state.pokemonReducer);
    const handleCloseModal = () => {
      dispatch(resetModal());
    }

  return (
    <div> 
              <Modal
        open={pokemonInfo?.showModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={pokemonInfo?.showModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#242424',
            borderRadius:'16px',
            boxShadow: 24,
            p: 4,
          }}>{
            pokemonInfo.isLoading ?? (<ModalSkeleton/>)
          }
            <Typography className={classes.pokemonName} variant="h6" component="h2">
              {pokemonInfo?.name}
            </Typography>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <img
                  className={classes.pokemonImage}
                  src={pokemonInfo?.url}
                  alt={pokemonInfo?.name}
                />
              </Grid>
              <Grid item xs={6}> 
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Height"
                      secondary={
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color='white'
                      >
                        {pokemonInfo?.height}
                      </Typography>
                      }
                      className={classes.listItemText}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Weight"
                      secondary={
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color='white'
                      >
                        {pokemonInfo?.weight}
                      </Typography>
                      }
                      className={classes.listItemText}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Order"
                      secondary={
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color='white'
                      >
                        {pokemonInfo?.order}
                      </Typography>
                      }
                      className={classes.listItemText}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <button onClick={handleCloseModal} style={{ color: '#fff', backgroundColor: '#001e3c', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '10px' }}>Close Modal</button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default PokemonInfo