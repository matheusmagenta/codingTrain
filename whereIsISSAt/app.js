// https://api.wheretheiss.at/v1/satellites/25544

// making a map and tiles
const myMap = L.map("issMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });

const apiURL = "https://api.wheretheiss.at/v1/satellites/25544";
tiles.addTo(myMap);

// making and setting a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(myMap);

let firstTime = true;

// getting the ISS location data from API
async function getISS() {
  const response = await fetch(apiURL);
  const data = await response.json();
  const { latitude, longitude } = data;

  // L.marker([latitude, longitude]).addTo(myMap);
  marker.setLatLng([latitude, longitude]);

  if (firstTime) {
    myMap.setView([latitude, longitude], 2);
    firstTime = false;
  }

  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("long").textContent = longitude.toFixed(2);
}

getISS();

setInterval(getISS, 2000);
