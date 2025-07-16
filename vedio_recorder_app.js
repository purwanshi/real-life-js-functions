<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Simple Video Recorder</title>
  <style>
    body {
      font-family: sans-serif;
      background-color: #121212;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }
    video {
      border: 4px solid;
      border-image: linear-gradient(to right, blue, purple, green, skyblue) 1;
      border-radius: 12px;
      width: 640px;
      height: 480px;
      margin-bottom: 20px;
    }
    button {
      padding: 10px 20px;
      background-color: #ffc107;
      color: #000;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      margin: 10px;
    }
    button:hover {
      background-color: #ffdd57;
    }
    a {
      margin-top: 10px;
      color: #ffc107;
      font-weight: bold;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <h2>🎥 Simple Video Recorder</h2>

  <video id="preview" autoplay muted></video>
  <video id="recording" controls style="display: none;"></video>

  <div>
    <button id="startBtn">Start Recording</button>
    <button id="stopBtn" disabled>Stop Recording</button>
    <a id="downloadLink" style="display: none;" download="recorded_video.webm">⬇️ Download Video</a>
  </div>

  <script>
    let mediaRecorder;
    let recordedChunks = [];

    const preview = document.getElementById('preview');
    const recording = document.getElementById('recording');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const downloadLink = document.getElementById('downloadLink');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        preview.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = e => {
          if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);

          recording.src = url;
          recording.style.display = 'block';
          downloadLink.href = url;
          downloadLink.style.display = 'inline-block';

          recordedChunks = [];
        };

        startBtn.onclick = () => {
          mediaRecorder.start();
          startBtn.disabled = true;
          stopBtn.disabled = false;
        };

        stopBtn.onclick = () => {
          mediaRecorder.stop();
          startBtn.disabled = false;
          stopBtn.disabled = true;
        };
      })
      .catch(err => {
        alert("Error accessing camera/mic: " + err.message);
        console.error(err);
      });
  </script>
</body>
</html>
