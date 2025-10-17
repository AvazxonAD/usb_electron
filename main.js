const { app, BrowserWindow } = require("electron");

app.commandLine.appendSwitch("ignore-certificate-errors");

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile("./renderer/index.html");
}

app.whenReady().then(createWindow);
