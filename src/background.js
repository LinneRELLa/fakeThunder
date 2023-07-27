'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'


const {  execFile,spawn } = require('child_process');

/*开启aira2*/
function startengine(){
console.log(process)
console.log(spawn);
const path = require('path');
const a2path=path.join(__dirname,'../../aria2')
console.log(`cd /d ${a2path} & start.bat`)

const child = spawn('cmd.exe', ['/c', `cd /d ${a2path} & start.bat`]);
child.stdout.on('data', (data) => {
  console.log(`输出：${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`错误：${data}`);
});

child.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
}
/*           */
/*child.kill(); windows环境下结束进程*/
function killtask(FileName){


const killarg=spawn('cmd.exe',['/c', `chcp 65001 & TASKKILL /F /IM ${FileName}`]);

killarg.stdout.on('data', (data) => {
  console.log(`输出：${data}`);
});

killarg.stderr.on('data', (data) => {
  console.error(`错误：${data}`);
});

killarg.on('close', (code) => {
  console.log(`子进程退出码：kill:${code}`);
});
}

/*        -------------            */

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    frame:false,
      webPreferences: {
     
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      enabkeRemoteModule:true,
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
/*  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }*/
  startengine();
  createWindow();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


app.on('before-quit', async function () {

  await killtask('aria2c.exe');
})





app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})