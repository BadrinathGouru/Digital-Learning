// Detect if running inside Android/Capacitor WebView
const isCapacitor = typeof window !== 'undefined' && window.Capacitor !== undefined;

// On Android emulator, 10.0.2.2 maps to the host machine's localhost
// On a real device, use your computer's local IP (e.g. 192.168.x.x)
const HOST = isCapacitor ? '10.0.2.2' : 'localhost';

export const API_BASE = `http://${HOST}:5001/api`;
export const SOCKET_URL = `http://${HOST}:5001`;
