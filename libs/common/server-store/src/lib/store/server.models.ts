import { createFeatureSelector } from '@ngrx/store';

export interface Server {
  name: string;
  id: string;
  ip: string;
  port: number;
  playerId: number;
  playerToken: number;
}

export interface Time {
  dayLengthMinutes: number;
  timeScale: number;
  sunrise: number;
  sunset: number;
  time: number;
}

export interface ServerState {
  servers: Server[];
  loading: boolean;
  time: Time;
}

export const selectServerState = createFeatureSelector<ServerState>('servers');
