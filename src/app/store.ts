import {configureStore} from '@reduxjs/toolkit';
import {ToDoReducer} from '../containers/Layout/ToDoSlice';

export const store = configureStore({
  reducer: {
    toDo: ToDoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;




