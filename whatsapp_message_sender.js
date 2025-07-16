<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Send WhatsApp Message</title>
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
      background-color: #25d366;
      border: none;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover {
      background-color: #1ebe57;
    }
  </style>
</head>
<body>
  <h2>Send WhatsApp Message</h2>

  <input type="text" id="whatsNum" placeholder="Enter phone (e.g. +919876543210)" />
  <textarea id="whatsMsg" rows="5" placeholder="Enter your message..."></textarea>
  <button onclick="sendWhatsApp()">Send via WhatsApp</button>

  <script>
    function sendWhatsApp() {
      const phone = document.getElementById('whatsNum').value.trim().replace(/\D/g, '');
      const msg = encodeURIComponent(document.getElementById('whatsMsg').value.trim());

      if (!phone || !msg) {
        alert("Please enter both phone number and message.");
        return;
      }

      const url = `https://wa.me/${phone}?text=${msg}`;
      window.open(url, '_blank');
    }
  </script>
</body>
</html>
