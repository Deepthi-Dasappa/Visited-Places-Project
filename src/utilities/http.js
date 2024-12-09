async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  const responseData = await response.json(); //await returns a promise so using async
  return responseData.places;
}

async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  const responseData = await response.json(); //await returns a promise so using async
  return responseData.places;
}

async function updateSelectedPlaces(places) {
  console.log("UpdateSelectedPlaces method in frontend execution started");
  console.log("Places from App.jsx:", places);
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places: places }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to update the user data.");
  }

  const responseData = await response.json();

  return responseData.message;
}

export { fetchAvailablePlaces, updateSelectedPlaces, fetchUserPlaces };
