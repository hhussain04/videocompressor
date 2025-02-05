const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const os = require('os');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);

const videoInput = document.getElementById('videoInput');
const compressButton = document.getElementById('compressButton');
const output = document.getElementById('output');
const progressBar = document.getElementById('progressBar');

compressButton.addEventListener('click', () => {
  console.log('Compress button clicked');
  if (videoInput.files.length === 0) {
    output.innerText = 'Please select a video file.';
    console.log('No video file selected');
    return;
  }

  const file = videoInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    console.log('File loaded into buffer');
    const buffer = event.target.result;
    const tempPath = path.join(os.tmpdir(), file.name);
    fs.writeFileSync(tempPath, Buffer.from(new Uint8Array(buffer)));
    console.log('File saved to temporary path:', tempPath);

    ffmpeg(tempPath)
      .outputOptions('-b:v 1000k')
      .on('progress', (progress) => {
        const percent = Math.round(progress.percent);
        progressBar.style.width = percent + '%';
        console.log('Compression progress:', percent + '%');
      })
      .on('end', () => {
        output.innerText = 'Compression complete!';
        progressBar.style.width = '0%';
        console.log('Compression complete');
        fs.unlinkSync(tempPath); // Clean up temporary file
      })
      .on('error', (err) => {
        output.innerText = `Error: ${err.message}`;
        progressBar.style.width = '0%';
        console.error('Compression error:', err);
        fs.unlinkSync(tempPath); // Clean up temporary file
      })
      .save(path.join('videooutputs', 'compressed_' + file.name));
  };

  reader.readAsArrayBuffer(file);
});

document.getElementById('view-videos-tab').addEventListener('click', async () => {
  try {
    const videoOutputsPath = path.join(__dirname, 'videooutputs');
    console.log('Reading videos from:', videoOutputsPath);
    const files = await fs.promises.readdir(videoOutputsPath);
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    files.forEach(file => {
      if (file.endsWith('.mp4')) {
        const videoPath = path.join(videoOutputsPath, file);
        console.log('Loading video:', videoPath);
        const videoElement = document.createElement('video');
        videoElement.src = videoPath;
        videoElement.controls = true;
        videoElement.addEventListener('error', (e) => {
          console.error('Error loading video:', videoPath, e);
        });
        videoContainer.appendChild(videoElement);
      }
    });
  } catch (error) {
    console.error('Error loading videos:', error);
  }
});
