const { PKCS11 } = require("pkcs11js");
const pkcs11 = new PKCS11();
const path = require("path");
const logTofile = require("../logToFile");
// const dllPath = "./opensc_pkcs11.dll";
const dllPath = path.join(__dirname, "./opensc-pkcs11.dll");
console.log(dllPath);

pkcs11.load(dllPath);

module.exports = () => {
  try {
    pkcs11.C_Initialize({ flags: PKCS11.CKF_OS_LOCKING_OK });
    console.log("PKCS#11 initialized successfully");

    // ture
    const slots_true = pkcs11.C_GetSlotList(true);
    console.log("Available true slots:", slots_true);
    logTofile(`Available true slots: ${JSON.stringify(slots_true, null, 2)}`);

    const slots_false = pkcs11.C_GetSlotList(false);
    console.log("Available false slots:", slots_false);
    logTofile(`Available false slots: ${JSON.stringify(slots_false, null, 2)}`);

    // Slotlar haqida detallar
    if (slots_false.length > 0) {
      slots_false.forEach((slot, index) => {
        try {
          const info = pkcs11.C_GetSlotInfo(slot);
          logTofile(`Slot ${index} Info: ${JSON.stringify(info, null, 2)}`);
        } catch (e) {
          logTofile(`Slot ${index} Error: ${e.message}`);
        }
      });
    }

    if (slots_true.length > 0) {
      slots_true.forEach((slot, index) => {
        try {
          const info = pkcs11.C_GetSlotInfo(slot);
          logTofile(`Slot ${index} Info: ${JSON.stringify(info, null, 2)}`);
        } catch (e) {
          logTofile(`Slot ${index} Error: ${e.message}`);
        }
      });
    }

    pkcs11.C_Finalize();
    return { slots_false, slots_true };
  } catch (e) {
    console.error("PKCS#11 error:", e);
  }
};
