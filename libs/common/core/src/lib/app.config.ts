import { InjectionToken } from '@angular/core';

export interface AppConfig {
  title: string;
  authEnabled: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('__APP_CONFIG__');
