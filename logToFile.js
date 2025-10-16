const fs = require("fs");
const path = require("path");
const os = require("os");

module.exports = function logToFile(message) {
  const desktopPath = path.join(os.homedir(), "Desktop", "debug.txt");
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  fs.appendFile(desktopPath, logMessage, (err) => {
    if (err) console.error("Failed to write log:", err);
  });
};
