import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {delay, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService<T> {
  public config: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public events = new Subject<ConfigEvent>();
  public done = this.events.pipe(take(1)).toPromise();

  constructor(private httpClient: HttpClient) { }

  async load(): Promise<any> {
    try {
      // TODO: Remove this for production app this is here for visualization
      const config = await this.httpClient.get('config.json').pipe(take(1)).toPromise();
      this.config.next(config);
      this.config.complete();
      this.events.next(new ConfigEvent(ConfigEvents.LoadSucceeded));
    } catch (err) {
      this.events.next(new ConfigEvent(ConfigEvents.LoadFailed, err));
    }
    this.events.complete();
  }

  get(): T {
    return this.config.getValue();
  }
}

export class ConfigEvent {
  constructor(public name: ConfigEvents, public value?: any) { }
}

export enum ConfigEvents {
  LoadSucceeded = 'LoadSucceeded',
  LoadFailed = 'LoadFailed'
}
