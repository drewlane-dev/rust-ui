import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server, Time } from './server.models';
import { AuthService } from '@best-practice/common/auth';
import { ConfigService } from '@best-practice/common/config';
import { AppConfig } from '@best-practice/common/core';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private readonly http: HttpClient, private readonly auth: AuthService, private readonly config: ConfigService<AppConfig>) {}

  list(): Observable<Server[]> {
    return this.http.get<Server[]>(`${this.config.get().api}server`, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    });
  }

  time(id: string): Observable<Time> {
    return this.http.get<Time>(`${this.config.get().api}server/${id}/time`, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    });
  }
}
