import { InjectionToken } from '@angular/core';

export interface AppConfig {
  title: string;
  authEnabled: boolean;
  api: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('__APP_CONFIG__');
