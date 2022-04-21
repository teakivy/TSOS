import { api as BridgeAPI } from '../../electron/bridge';

declare global {
  // eslint-disable-next-line
  interface Window {
    api: typeof BridgeAPI;
  }
}
