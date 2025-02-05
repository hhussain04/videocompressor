const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  // mainWindow.webContents.openDevTools()
}

ipcMain.handle('compress-file', async (event, { filePath, options }) => {
  // TODO: Add FFmpeg compression logic
  return { success: true, outputPath: filePath }
})

app.whenReady().then(createWindow)
