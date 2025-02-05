# Video Compressor

This is an ongoing project for a video compression application built using Electron and Node.js. The application allows users to compress video files directly from their desktop.

## Features
- Select a video file for compression
- Monitor compression progress with a progress bar (WIP)
- Save compressed videos to a designated output directory 'videooutputs' (you must create this in the directory you clone this repo in!!)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hhussain04/videocompressor.git
   ```
2. Navigate to the project directory:
   ```bash
   "cd video compressor"
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the application:
   ```bash
   npm start
   ```
2. Select a video file using the application interface.
3. Click the "Compress" button to start the compression process.
4. The compressed video will be saved in the `videooutputs` directory.

## Development
This project uses the following technologies:
- Electron
- Node.js
- Fluent-ffmpeg

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
