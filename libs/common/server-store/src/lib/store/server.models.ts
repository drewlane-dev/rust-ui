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

export interface SaleItem {
  currencyType: string;
  itemType: string;

  quantity: number;
  costPerItem: number;
  amountInStock: number;
  itemId: number;
  currencyId: number;
  detail: any;
  currencyDetail: any;
  square: string;
  x: number;
  y: number;
  thumbnail: string;
  currencyThumbnail: string;

  store: string;


}

export interface InventoryItem {
  name: string;
  quantity: number;
  id: number;
  detail: any;
  thumbnail: string;
  storageName: string;
  storageFloor: number;
  children: any;
}

export interface ServerState {
  servers: Server[];
  loading: boolean;
  time: Time;
  forsale: SaleItem[];
  inventory: InventoryItem[];

}

export const selectServerState = createFeatureSelector<ServerState>('servers');
