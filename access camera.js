<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webcam Capture</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #121212;
      color: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      background: #1e1e1e;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      text-align: center;
      width: 90%;
      max-width: 700px;
    }

    h2 {
      margin-bottom: 20px;
      color: #ffc107;
    }

    .video-wrapper {
      padding: 5px;
      border-radius: 12px;
      background: linear-gradient(110deg, blue, purple, green, skyblue);
      margin-bottom: 20px;
    }

    video, canvas, img {
      width: 100%;
      max-width: 640px;
      height: auto;
      display: block;
      border-radius: 8px;
    }

    button {
      background-color: #ffc107;
      color: #000;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      margin: 10px 0;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #ffdb4d;
    }

    a {
      display: inline-block;
      margin-top: 10px;
      color: #ffc107;
      text-decoration: underline;
      font-weight: bold;
    }

    a:hover {
      color: #fff176;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Webcam Image Capture</h2>

    <div class="video-wrapper">
      <video id="video" autoplay></video>
    </div>

    <button id="capture">📸 Capture Image</button>

    <canvas id="canvas" width="640" height="480" style="display: none;"></canvas>
    <img id="snapshot" style="display: none;" />
    <a id="downloadLink" style="display: none;" download="captured_image.png">⬇️ Download Image</a>
  </div>

  <script>
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const downloadLink = document.getElementById('downloadLink');
    const snapshot = document.getElementById('snapshot');
    const context = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        console.error('Error accessing camera:', err);
      });

    captureButton.addEventListener('click', () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');

      snapshot.src = imageData;
      snapshot.style.display = 'block';

      downloadLink.href = imageData;
      downloadLink.style.display = 'inline';
      downloadLink.textContent = '⬇️ Download Image';
    });
  </script>
</body>
</html>
