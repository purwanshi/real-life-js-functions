<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Find Nearby Places</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #121212;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px;
    }
    input {
      width: 320px;
      padding: 10px;
      margin: 10px 0;
      border-radius: 6px;
      border: 1px solid #555;
      background-color: #1e1e1e;
      color: white;
    }
    button {
      background-color: #25d366;
      border: none;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 10px;
      width: 340px;
    }
    button:hover {
      background-color: #1ebe57;
    }
    #status {
      margin-top: 20px;
      font-size: 16px;
      color: #ccc;
      min-height: 24px;
      text-align: center;
      user-select: text;
    }
  </style>
</head>
<body>

  <h2>Find Nearby Places</h2>
  <input type="text" id="placeQuery" placeholder="What are you looking for? (e.g. grocery store, hospital)" />
  <button onclick="findNearbyPlaces()">Search Nearby</button>
  <div id="status"></div>

  <script>
    function findNearbyPlaces() {
      const status = document.getElementById('status');
      const query = document.getElementById('placeQuery').value.trim();

      if (!query) {
        status.textContent = "Please enter what you're looking for.";
        return;
      }

      if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser.";
        return;
      }

      status.textContent = "Getting your current location...";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);

          status.textContent = `Showing nearby "${query}" around your location (${lat}, ${lon})`;

          // Build Google Maps search URL for nearby places
          // Format: https://www.google.com/maps/search/<query>/@lat,lon,zoomz
          // We'll use zoom=15 for neighborhood-level view
          const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lon},15z`;

          window.open(mapsUrl, '_blank');
        },
        (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              status.textContent = "Permission denied. Please allow location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              status.textContent = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              status.textContent = "The request to get your location timed out.";
              break;
            default:
              status.textContent = "An unknown error occurred.";
          }
        }
      );
    }
  </script>

</body>
</html>
