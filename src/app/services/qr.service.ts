import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Injectable({
  providedIn: 'root'
})
export class QRService {

  scan: boolean = false;
  scanResult: any = "";

  constructor() { }

  async CheckPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;

    } catch (e) {
      return undefined;
    }
  }

  async StartScan() {
    if (!this.scan) {
      this.scan = true;
      try {
        const permission = await this.CheckPermission();
        if (!permission) {
          alert("No hay Permisos de Camara");
          this.scan = false;
          this.scanResult = "Error. Sin permisos";
        } else {
          await BarcodeScanner.hideBackground();
          document.querySelector('body')?.classList.add('scanner-active');
          const result = await BarcodeScanner.startScan();
          console.log("Resultado: ", result);
          BarcodeScanner.showBackground();
          document.querySelector('body')?.classList.remove('scanner-active');
          this.scan = false;
          if (result?.hasContent) {
            this.scanResult = result.content;
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.StopScan();
    }
  }

  StopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.scan = false;
    this.scanResult = "Stop Scan";
  }
}