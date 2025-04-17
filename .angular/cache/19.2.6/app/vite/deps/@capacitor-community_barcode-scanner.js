import {
  CameraDirection,
  SupportedFormat,
  registerPlugin
} from "./chunk-SWOIOTSH.js";
import "./chunk-ZVATTXSA.js";

// node_modules/@capacitor-community/barcode-scanner/dist/esm/index.js
var BarcodeScanner = registerPlugin("BarcodeScanner", {
  web: () => import("./web-6AKJIPH4.js").then((m) => new m.BarcodeScannerWeb())
});
export {
  BarcodeScanner,
  CameraDirection,
  SupportedFormat
};
//# sourceMappingURL=@capacitor-community_barcode-scanner.js.map
