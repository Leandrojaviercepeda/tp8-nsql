import React, {useEffect, useState} from 'react';
//************************************** Material-UI Components ******************************************
import {
    Container,
} from '@material-ui/core'


//************************************** React Leaflet ******************************************
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';


//********************************************* API *********************************************
import {ClusteringMapUrlBase} from '../../../utils/constants';
import axios from 'axios';


//************************************* Styles ****************************************
import './CSS/style.css'
const leafletContainer = { width: '100%', height: '100vh'}

//********************************************* Components *********************************************
export default function RestaurantsMap(props) {

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [restaurants, setRestaurants] = useState([])
    const handleRestaurants = restaurants => setRestaurants(restaurants)

    const [activeRestaurant, setActiveRestaurant] = useState(null)
    const handleActiveRestaurant = activeRestaurant => setActiveRestaurant(activeRestaurant)

    useEffect(() => {
        console.log('1° RestaurantsMap...')
        const fetchRestaurants = async (field, category) => {
            const restaurantsFetched = await axios.get(`${ClusteringMapUrlBase}/restaurants?${field}=${category}`)            
            return restaurantsFetched.data 
            ? handleRestaurants(restaurantsFetched.data)
            : handleStatus(true, 'warning', 'No fue posible cargar los restaurantes!')
        }
        if (props.field && props.category)
            fetchRestaurants(props.field, props.category)
        
    }, [props.field, props.category]);

    // const myIcon = L.icon({
    //     iconUrl: myURL + 'images/pin24.png',
    //     iconRetinaUrl: myURL + 'images/pin48.png',
    //     iconSize: [29, 24],
    //     iconAnchor: [9, 21],
    //     popupAnchor: [0, -14]
    // });

    // const createClusterCustomIcon = function (cluster) {
    //     return L.divIcon({
    //       html: `<span>${cluster.getChildCount()}</span>`,
    //       className: 'marker-cluster-custom',
    //       iconSize: L.point(40, 40, true),
    //     });
    // }

    return (
        <Container fixed>
            <Map className="markercluster-map" center={[40.6976701, -74.2598751]} zoom={12} style={leafletContainer}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    restaurants.lenght !== 0
                    ? restaurants.map(r => (
                        <MarkerClusterGroup 
                            
                        >
                            <Marker
                                key={r.restaurant_id}
                                position={[r.address.coord[1], r.address.coord[0]]}
                                onClick={() => handleActiveRestaurant(r)}
                            >

                                <Popup
                                    position={[r.address.coord[1], r.address.coord[0]]}
                                    closeButton={false}
                                >
                                    <h2>Nombre: {r.name}</h2>
                                    <p>Ciudad: {r.borough}</p>
                                    <p>Direccion: {r.address.street}</p>
                                    <p>Tipo de Comida: {r.cuisine}</p>
                                </Popup>

                            </Marker>
                        </MarkerClusterGroup>
                    ))
                    : ''
                }
            </Map>
        </Container>
    )
}