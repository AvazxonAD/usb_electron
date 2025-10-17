const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("eimzo", {
  listCertificates: () => ipcRenderer.invoke("list-certificates"),
});
