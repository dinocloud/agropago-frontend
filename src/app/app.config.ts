import { InjectionToken } from "@angular/core";

export interface AppConfig {
  apiEndpoint: string;
}

export const AGROPAGO_CONFIG: AppConfig = {
  apiEndpoint: 'https://agropago.com:8081'
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
