import { Injectable } from '@angular/core';

import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false
  }

  constructor() { }

  getSettings(): Settings {
    return this.settings;
  }

}
