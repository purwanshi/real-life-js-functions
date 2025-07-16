<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Send SMS</title>
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
    input, textarea {
      width: 300px;
      padding: 10px;
      margin: 10px 0;
      border-radius: 6px;
      border: 1px solid #555;
      background-color: #1e1e1e;
      color: white;
    }
    button {
      background-color: #ffcc00;
      border: none;
      color: black;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover {
      background-color: #ffe066;
    }
  </style>
</head>
<body>
  <h2>Send SMS</h2>

  <input type="text" id="smsNum" placeholder="Enter phone (e.g. +919876543210)" />
  <textarea id="smsMsg" rows="5" placeholder="Enter your message..."></textarea>
  <button onclick="sendSMS()">Send SMS</button>

  <p id="status"></p>

  <script>
    function sendSMS() {
      const phone = document.getElementById('smsNum').value.trim();
      const message = document.getElementById('smsMsg').value.trim();

      if (!phone || !message) {
        alert("Please enter both phone number and message.");
        return;
      }

      fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to: phone, body: message })
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById('status').innerText = "✅ SMS sent successfully!";
      })
      .catch(err => {
        document.getElementById('status').innerText = "❌ Failed: " + err.message;
      });
    }
  </script>
</body>
</html>
