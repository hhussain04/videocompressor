const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  compressFile: (filePath, options) => ipcRenderer.invoke('compress-file', { filePath, options })
})
