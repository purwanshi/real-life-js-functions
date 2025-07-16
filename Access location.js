<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Show Current Location</title>
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
    button {
      background-color: #25d366;
      border: none;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 10px;
    }
    button:hover {
      background-color: #1ebe57;
    }
    #locationOutput {
      margin-top: 20px;
      font-size: 18px;
      color: #ccc;
      text-align: center;
      min-height: 24px;
      user-select: text;
    }
  </style>
</head>
<body>

  <h2>Your Current Location</h2>
  <button onclick="showCurrentLocation()">Get My Location</button>
  <div id="locationOutput"></div>

  <script>
    function showCurrentLocation() {
      const output = document.getElementById('locationOutput');

      if (!navigator.geolocation) {
        output.textContent = "Geolocation is not supported by your browser.";
        return;
      }

      output.textContent = "Locating...";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          output.textContent = `Latitude: ${lat} °, Longitude: ${lon} °`;
        },
        (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              output.textContent = "Permission denied. Please allow location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              output.textContent = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              output.textContent = "The request to get your location timed out.";
              break;
            default:
              output.textContent = "An unknown error occurred.";
          }
        }
      );
    }
  </script>

</body>
</html>
