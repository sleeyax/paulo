import phin from 'phin';
import { Manifest } from 'stremio-addon-sdk';

export const API_URL = 'https://api.strem.io';

export interface Addon {
  transportUrl: string;
  transportName: string;
  manifest: Manifest;
}

export async function getAddonsList(): Promise<Addon[]> {
  const response = await phin(
    `${API_URL}/addonscollection.json?cacheBreak=${Date.now()}`,
  );
  return JSON.parse(response.body.toString());
}
