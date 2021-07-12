import { useMediaQuery } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import React from 'react';
import MapStyles from './mapStyles';



const useStyles = makeStyles((theme) => ({
    mapContainer: {
        width: '92.25%',
        marginLeft: '17px',
        height: '250px',
        position: 'relative'
    },
    mapContainerForMobile: {
        width: '90.70%',
        marginLeft: '17px',
        height: '250px',
        position: 'relative'
    },
}));


const Directions = ({ destinations, setDistance, ...props }) => {
    const classes = useStyles();

    const handleMapReady = (mapProps, map) => {
        calculateAndDisplayRoute(map);
    }

    const calculateAndDisplayRoute = (map) => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsDisplay = new window.google.maps.DirectionsRenderer();

        directionsDisplay.setMap(map);
        const waypoints = [];
        destinations.map(item => (
            waypoints.push({
                location: { lat: item.latitude, lng: item.longitude },
                stopover: true
            })
        ))
        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;

        directionsService.route({
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                let distance = 0;
                response.routes[0].legs.forEach(element => {
                    distance += element.distance.value;
                });
                const miles = (distance / 1000) * 0.621371;
                setDistance(miles.toFixed(2));
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    
 const isMobile = useMediaQuery("(max-width:650px)")

    return (
        <>
            <Grid container direction='column'>
                <Grid item className={!isMobile ? classes.mapContainer : classes.mapContainerForMobile}>
                    <Map
                        google={props.google}
                        styles={MapStyles}
                        disableDefaultUI={true}
                        className={"map"}
                        onReady={handleMapReady}>
                    </Map>
                </Grid>
            </Grid>
        </>
    )
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM'),
    libraries: ["geometry"]
})(Directions)