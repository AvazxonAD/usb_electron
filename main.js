const { app, BrowserWindow } = require("electron");
const path = require("path");
const start = require("./scripts/start.js");
const usb = require("./scripts/usb.js");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "assets", "usb.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  start();
  createWindow();
  usb();

  app.on("before-quit", () => {});

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
