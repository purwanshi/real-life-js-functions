<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Route from Current Location to Destination by Name</title>
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
      width: 300px;
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
      width: 320px;
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

  <h2>Route from Current Location to Destination</h2>
  <input type="text" id="destination" placeholder="Enter destination name or address" />
  <button onclick="showRoute()">Show Route</button>

  <div id="status"></div>

  <script>
    function showRoute() {
      const status = document.getElementById('status');
      const destination = document.getElementById('destination').value.trim();

      if (!destination) {
        status.textContent = "Please enter a destination name or address.";
        return;
      }

      if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser.";
        return;
      }

      status.textContent = "Getting your current location...";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLat = position.coords.latitude.toFixed(6);
          const currentLon = position.coords.longitude.toFixed(6);

          status.textContent = `Current Location: ${currentLat}, ${currentLon}
          \nOpening Google Maps route...`;

          // Encode destination for URL
          const destinationEncoded = encodeURIComponent(destination);

          // Google Maps directions URL with origin lat/lon and destination string:
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLon}&destination=${destinationEncoded}`;

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
