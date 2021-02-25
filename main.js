/*
 * @Description: file content
 * @Author: 
 * @Date: 2020-07-20 13:54:22
 * @LastEditors: Mr.WJ
 * @LastEditTime: 2021-02-25 14:13:47
 */ 
const { app, BrowserWindow, Menu, Tray} = require('electron')
const fs = require('fs');
const path = require('path')
const bodyStatusJsonPath = path.join(`${__dirname}`, 'bodyStatus.json');
global.bodyPath = bodyStatusJsonPath;
function createWindow () {   
  // 创建浏览器22窗口
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  createTray();
  // 并且为你的应用加载index.html
  // win.loadFile('index.html')
  win.loadURL('http://localhost:8080')

  // 打开开发者工具
  win.webContents.openDevTools()
  
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
function createTray(){
  let tray = null
  tray = new Tray('./app/logo.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}
// 您可以把应用程序其他的流程写在在此文件中
// 代码 也可以拆分成几个文件，然后用 require 导入。