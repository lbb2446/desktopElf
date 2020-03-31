'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false, // 无边框
    transparent: true// 背景透明
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // let myNotification = new Notification('标题', {
  //   body: '通知正文内容'
  // })

  // myNotification.onclick = () => {
  //   console.log('通知被点击')
  // }
}

const {ipcMain} = require('electron')
ipcMain.on('mini', (event, arg) => {
  console.log(arg) // prints "ping"
  // event.sender.send('asynchronous-reply', 'pong')
  mainWindow.setSize(100, 100)
  mainWindow.loadURL(winURL + '#/mini')
})
ipcMain.on('normal', (event, arg) => {
  console.log(arg) // prints "ping"
  // event.sender.send('asynchronous-reply', 'pong')
  mainWindow.setSize(600, 200)
  mainWindow.loadURL(winURL + '#/')
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
