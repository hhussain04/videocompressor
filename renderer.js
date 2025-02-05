import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone')
  const fileInput = document.getElementById('file-input')
  const compressionOptions = document.getElementById('compression-options')

  // Drag & drop handlers
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropZone.classList.add('dragover')
  })

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover')
  })

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  })

  // File input handler
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files)
  })

  async function handleFiles(files) {
    const file = files[0]
    if (!file) return

    try {
      if (file.type.startsWith('video/')) {
        const compressedVideoUrl = await compressVideo(file);
        console.log('Compressed video available at:', compressedVideoUrl);
      } else {
        const result = await window.electronAPI.compressFile(file.path, {
          quality: document.getElementById('quality').value,
          outputFormat: document.getElementById('format').value
        })
        console.log('Compression result:', result)
      }
    } catch (error) {
      console.error('Compression failed:', error)
    }
  }

  async function compressVideo(inputFile) {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(inputFile));

    await ffmpeg.run('-i', 'input.mp4', '-vcodec', 'libx265', '-crf', '28', 'output.mp4');

    const data = ffmpeg.FS('readFile', 'output.mp4');

    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(videoBlob);

    return videoUrl;
  }
})
