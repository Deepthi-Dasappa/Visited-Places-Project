import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../utilities/Location.js";
import { fetchAvailablePlaces } from "../utilities/http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  //Without using async await keywords
  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       console.log("responseData:", responseData.places);
  //       return setAvailablePlaces(responseData.places);
  //     });
  // }, []);

  //Using async await
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const availablePlaces = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedAvailablePlaces = sortPlacesByDistance(
            availablePlaces,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedAvailablePlaces);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Couldn't fetch places, please try again later",
        });
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error have occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={availablePlaces.length === 0}
      loadingText="Fetching the available places"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
