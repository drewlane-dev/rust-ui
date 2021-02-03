import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfigService} from './config.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeConfig,
      deps: [ConfigService]
    }
  ],
})
export class ConfigModule { }

export function initializeConfig(configService: ConfigService<any>): () => Promise<any> {
  return (): Promise<any> => {
    return configService.load();
  };
}
