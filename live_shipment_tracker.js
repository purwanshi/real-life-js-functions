<!DOCTYPE html>
<html>
<head>
    <title>📦 Live Shipment Tracker + Blink & Auto Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #status {
            font-size: 22px;
            color: darkgreen;
            margin: 20px 0;
        }
        #blinkText {
            font-size: 24px;
            color: crimson;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <h2>📦 Shipment Status Tracker 📡</h2>

    <div id="blinkText">LIVE STATUS FEED</div>

    <button onclick="fetchShipment()">Check Shipment Status</button>
    <button onclick="startAutoUpdate()">Auto Update (5 sec)</button>
    <button onclick="stopAutoUpdate()">Stop Auto Update</button>

    <div id="status">No shipment info yet.</div>

<script>
    // Store auto-update interval ID so we can stop it
    let updateInterval;
    let blinkInterval;
    let j = 0; // toggle for blink function

    // Function to fetch shipment status (asynchronous request)
    function fetchShipment() {
        let xhr = new XMLHttpRequest(); // create request object

        // Show loading message immediately
        document.getElementById("status").innerHTML = "⏳ Fetching latest shipment status...";

        xhr.open("GET", "shipment_status.txt", true); // set method, URL, async=true
        xhr.send(); // send request to server or file

        // Trigger this every time request state changes
        xhr.onreadystatechange = function() {
            // When request is finished (readyState 4) and successful (status 200)
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Replace div content with fetched text
                document.getElementById("status").innerHTML = xhr.responseText;
            }
        }
    }

    // Function to auto-update shipment status every 5 sec
    function startAutoUpdate() {
        updateInterval = setInterval(fetchShipment, 5000);
    }

    // Function to stop auto update
    function stopAutoUpdate() {
        clearInterval(updateInterval);
    }

    // Function to blink the LIVE text continuously
    // function blinkLiveText() {
    //     let textDiv = document.getElementById("blinkText");
    //     if (j == 0) {
    //         textDiv.innerHTML = "🔴 LIVE STATUS FEED";
    //         j = 1;
    //     } else {
    //         textDiv.innerHTML = " ";
    //         j = 0;
    //     }
    // }

    // Start blinking text as soon as page loads, every 800ms
    blinkInterval = setInterval(blinkLiveText, 800);
</script>

</body>
</html>
