import { createAction, props } from '@ngrx/store';
import { InventoryItem, SaleItem, Server, TeamMember, Time } from './server.models';

export const list = createAction('[Server] List');
export const listSuccess = createAction('[Server] List Success', props<{ servers: Server[] }>());

export const time = createAction('[Server] Time', props<{ id: string }>());
export const timeSuccess = createAction('[Server] Time Success', props<{ time: Time }>());

export const forsale = createAction('[Server] For Sale', props<{ id: string }>());
export const forsaleSuccess = createAction('[Server] For Sale Success', props<{ forsale: SaleItem[] }>());

export const inventory = createAction('[Server] Inventory', props<{ id: string }>());
export const inventorySuccess = createAction('[Server] Inventory Success', props<{ inventory: InventoryItem[] }>());

export const team = createAction('[Server] Team', props<{ id: string }>());
export const teamSuccess = createAction('[Server] Team Success', props<{ team: TeamMember[] }>());
