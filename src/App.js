import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

// ? To call the api 
import { getPlacesData, getWeatherData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // for scroll places and filter
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});

  // for boundaries
  const [bounds, setBounds] = useState({ sw: 0, ne: 0 });

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  // const [autocomplete, setAutocomplete] = useState(null);


  //for coors of user location
  //only start at the beginning of the application

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);


  // only for rating changes
  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);




  // if you forgot the dependency arry, the code inside this block will only work at the start of the application
  // don't forgot this function returns data so we need state 
  // since our getPlacesData is async fun, we have to call .then()
  // we need to pass arg to this function as we need to call the right restaurants for the map
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));


      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      })
    }
  }, [type, coordinates, bounds]);

  // console.log(places);
  // console.log(filteredPlaces);

  // const onLoad = (autoC) => setAutocomplete(autoC);

  // const onPlaceChanged = () => {
  //   const lat = autocomplete.getPlace().geometry.location.lat();
  //   const lng = autocomplete.getPlace().geometry.location.lng();

  //   setCoordinates({ lat, lng });
  // };

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} styles={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={filteredPlaces.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
