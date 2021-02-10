import { ServerState } from './server.models';
import * as serverActions from './server.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: ServerState = {
  servers: [],
  loading: false,
  time: undefined
};

const reducer = createReducer(
  initialState,
  on(serverActions.list, state => ({
    ...state,
    loading: true,
  })),
  on(serverActions.listSuccess, (state, action) => ({
    ...state,
    servers: action.servers,
    loading: false,
  })),
  on(serverActions.timeSuccess, (state, action) => ({
    ...state,
    time: action.time,
  }))
);

export function serverReducer(state: ServerState | undefined, action: Action): ServerState {
  return reducer(state, action);
}
