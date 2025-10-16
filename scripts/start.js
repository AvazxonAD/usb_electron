const { spawn } = require("child_process");
const path = require("path");

module.exports = () => {
  const exePath = path.join(__dirname, "cpp-service.exe");

  const cpp = spawn(exePath, [], {
    cwd: path.dirname(exePath),
    stdio: "ignore",
    windowsHide: true,
  });

  cpp.on("error", (err) => {
    console.error("C++ serverni ishga tushirib bo‘lmadi:", err);
  });

  cpp.on("exit", (code) => {
    console.log("C++ server to‘xtadi. Exit code:", code);
  });
};
