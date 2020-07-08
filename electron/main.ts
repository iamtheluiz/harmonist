import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import NodeID3 from 'node-id3'
import getFileMetadata from './getFileMetadata'

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
    title: 'Harmonist'
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('getMusicMetadata', (event, file) => {
  const metadata = getFileMetadata(file)

  event.returnValue = metadata
})

ipcMain.on('setMusicMetadata', (event, data) => {
  const metadata = getFileMetadata(data.file)

  let definedMetadata = { ...data.metadata }

  if (!data.metadata.image) {
    definedMetadata = { ...definedMetadata, ...metadata }
  }

  const success = NodeID3.write(definedMetadata, data.file)

  event.returnValue = success
})

app.on('ready', createWindow)
app.allowRendererProcessReuse = true
