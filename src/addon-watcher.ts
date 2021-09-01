import phin from 'phin';
import Addon from './models/addon';

export default class AddonWatcher {
  async getAddonsList(cached?: boolean) {
    let addons: Addon[];

    // TODO: search addon in db instead
    if (cached) {
    } else {
      const response = await phin(
        'https://api.strem.io/addonscollection.json?cacheBreak=' + Date.now(),
      );
      addons = JSON.parse(response.body) as Addon[];
    }

    return addons;
  }
}
