import { createAction, props } from '@ngrx/store';
import { Server, Time } from './server.models';

export const list = createAction('[Server] List');
export const listSuccess = createAction('[Server] List Success', props<{ servers: Server[] }>());

export const time = createAction('[Server] Time', props<{ id: string }>());
export const timeSuccess = createAction('[Server] Time Success', props<{ time: Time }>());
