async function updateStatus() {
  const statusElement = document.getElementById("status");
  const indicator = document.getElementById("indicator");

  const data = await window.api.getStatus();
  const isConnected = data.status === "online";

  statusElement.textContent = isConnected ? "USB token ulangan" : "USB token ulanmagan";

  indicator.className = isConnected ? "circle connected" : "circle disconnected";
}

setInterval(updateStatus, 2000);
updateStatus();
