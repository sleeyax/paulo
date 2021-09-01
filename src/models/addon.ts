import { Manifest } from 'stremio-addon-sdk';

export default interface Addon {
  transportUrl: string;
  transportName: string;
  manifest: Manifest;
}
