const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getStatus: async () => {
    try {
      const res = await fetch("http://localhost:8081/keys");
      const data = await res.json();

      if (data.length) {
        return { status: "online" };
      } else {
        return { status: "offline" };
      }
    } catch (error) {
      return { status: "offline" };
    }
  },
});
