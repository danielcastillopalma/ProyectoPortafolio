import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.puntoverde.app',
  appName: 'PuntoVerde',
  webDir: 'www',
  server: {
    allowNavigation: [
      "respawnen3.duckdns.org"
    ],
    cleartext: false
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  }
};

export default config;
