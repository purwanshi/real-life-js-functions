<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Send Email</title>
  <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
  <script>
    (function(){
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
    })();
  </script>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f4f7f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      background: #fff;
      padding: 30px 40px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
    }

    h2 {
      margin-bottom: 20px;
      text-align: center;
      color: #333;
    }

    label {
      display: block;
      margin-top: 15px;
      margin-bottom: 5px;
      color: #555;
      font-weight: 500;
    }

    input, textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 16px;
      transition: border 0.3s;
    }

    input:focus, textarea:focus {
      border-color: #007bff;
      outline: none;
    }

    button {
      margin-top: 20px;
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: #fff;
      font-size: 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #0056b3;
    }

    #status {
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
      color: #28a745;
    }

    #status.error {
      color: #dc3545;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Send Email</h2>

    <form id="emailForm">
      <label for="to_email">To Email:</label>
      <input type="email" id="to_email" required>

      <label for="subject">Subject:</label>
      <input type="text" id="subject" required>

      <label for="message">Message:</label>
      <textarea id="message" rows="6" required></textarea>

      <button type="submit">Send Email</button>
    </form>

    <p id="status"></p>
  </div>

  <script>
    document.getElementById('emailForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const toEmail = document.getElementById('to_email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const status = document.getElementById('status');

      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: toEmail,
        subject: subject,
        message: message,
      }).then(function(response) {
        status.textContent = "✅ Email sent successfully!";
        status.classList.remove('error');
        document.getElementById('emailForm').reset();
      }, function(error) {
        status.textContent = "❌ Failed to send email: " + error.text;
        status.classList.add('error');
      });
    });
  </script>

</body>
</html>
