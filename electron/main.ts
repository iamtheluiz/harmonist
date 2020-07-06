import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import NodeID3 from 'node-id3'

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
  try {
    const { title, artist, album = null, image } = NodeID3.read(file)

    event.returnValue = {
      title,
      artist,
      album,
      image
    }
  } catch (error) {
    event.returnValue = {
      title: '',
      artist: '',
      album: '',
      image: ''
    }
  }
})

app.on('ready', createWindow)
app.allowRendererProcessReuse = true
