import React,{useState, useEffect} from 'react';
import {ClusteringMapUrlBase} from '../../../utils/constants'
import axios from 'axios'
//***********************************************************************************************
//************************************ Components MAteria-UI ************************************
//***********************************************************************************************
import { Grid, Paper, makeStyles, TextField, Typography, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      marginTop: 15,
      marginRight: 15,
      color: theme.palette.text.secondary,
    },
    grid:{
      marginLeft:1,
      marginRight:1
    }
  }));

export default function NewRestaurant() {
    const classes = useStyles()

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [specialties, setSpecialties] = useState('')
    const handleSpecialties = specialty => setSpecialties(specialty)

    useEffect(() => {
      const fetchSpecialties = async () => {
          try{
              const specialtiesFetched = await axios.get(`${ClusteringMapUrlBase}/elements?atributte=cuisine`)
              return specialtiesFetched.data 
                  ? handleSpecialties(specialtiesFetched.data) 
                  : handleStatus(true, 'error', 'No hay pelicula para mostrar')
          } catch (error) {
              handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
          }
      }
      fetchSpecialties()
  }, []);


    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
              <img alt="" style={{display:'block', marginTop:15, marginLeft:'auto', marginRight:'auto'}}src="https://image.flaticon.com/icons/png/512/45/45454.png"></img>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={5}  className={classes.paper}>
                  <h1><RestaurantMenuIcon/> &bull; AÑADIR RESTAURANT &bull; <RestaurantMenuIcon/></h1>
                      
                  {
                    specialties
                    ?

                      <Grid container spacing={3} className={classes.grid}>
                        <Grid item xs={8}>
                          <TextField
                            required
                            id="combre"
                            name="combre"
                            label="Nombre restaurant"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            required
                            id="id"
                            name="id"
                            label="id"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <Typography align="left" variant="h6" gutterBottom>Especialidad:</Typography>
                          <Autocomplete
                            id="combo-box-demo"
                            options={specialties}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} required id="standard-basic" label="Especialidad"/>}
                          />
                        </Grid>
                        <Grid item xs={11}>
                        <Typography align="left" variant="h6" gutterBottom>Ubicación:</Typography>
                          <TextField
                            required
                            id="ciudad"
                            name="ciudad"
                            label="Ciudad"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <TextField
                            required
                            id="calle"
                            name="calle"
                            label="Calle"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            required
                            id="numero"
                            name="numero"
                            label="Num"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            required
                            id="codigo"
                            name="codigo"
                            label="CP"
                            fullWidth
                          />
                        </Grid> 
                        <Grid item xs={6}>
                          <TextField
                            required
                            id="latitud"
                            name="latitud"
                            label="Latitud"
                            fullWidth
                          /> 
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            required
                            id="longitud"
                            name="longiut"
                            label="Longitud"
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={11}>
                        <Button size="medium" variant="contained" color="primary" startIcon={<AddLocationIcon />}>
                          Añadir 
                        </Button>
                      </Grid>
                      </Grid>
                  
                  : null
                  }   

                </Paper>
            </Grid>
        </Grid>
      </div>
    )
}