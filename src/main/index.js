'use strict'

import {
  app,
  BrowserWindow,
  Tray,
  Menu
} from 'electron'

let path = require("path")
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`



function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 450,
    useContentSize: true,
    width: 204,
    frame: false, // 无边框
    transparent: true, // 背景透明
    // icon:__dirname+''
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const {
  ipcMain
} = require('electron')
ipcMain.on('mini', (event, arg) => {
  console.log(arg) // prints "ping"
  // event.sender.send('asynchronous-reply', 'pong')
  mainWindow.setSize(204, 426)
  mainWindow.loadURL(winURL + '#/')
})
ipcMain.on('normal', (event, arg) => {
  console.log(arg) // prints "ping"
  // event.sender.send('asynchronous-reply', 'pong')
  mainWindow.setSize(554, 430)
  mainWindow.loadURL(winURL + '#/')
})

ipcMain.on('sendmsg', (event, arg) => {
  console.log(arg) // prints "ping"
  // event.sender.send('asynchronous-reply', 'pong')

})

ipcMain.on('changesize', (event, arg) => {
  console.log(arg.width, arg.height)
  mainWindow.setSize(arg.width, arg.height)
  // mainWindow.setSize(554, 430)
})
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  // }
  // 设置托盘
  await createWindow()
  let iconPath = path.join(__dirname, "../renderer/assets/logo.png")
  const tray = new Tray(iconPath)
  // 设置托盘菜单
  const trayContextMenu = Menu.buildFromTemplate([{
    label: '打开',
    click: () => {
      mainWindow.show()
    }
  }, {
    label: '退出',
    click: () => {
      app.quit()
    }
  }])
  tray.setToolTip('myApp')
  tray.on('click', () => {
    mainWindow.show()
  })
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu)
  })

})

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