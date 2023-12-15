import {ActionReducerMapBuilder, createSlice, Draft} from '@reduxjs/toolkit';
import {ApiTask} from '../../types';
import {fetchToDo} from './ToDoThunks';


export interface ToDoState {
  list: ApiTask[];
  isLoading: boolean;
}

const initialState: ToDoState = {
  list: [],
  isLoading: false,
};

export const ToDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    add: (state) => {
      // console.log(state);
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<ToDoState>) => {
    builder.addCase(fetchToDo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchToDo.fulfilled, (state: Draft<ToDoState>, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchToDo.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const ToDoReducer = ToDoSlice.reducer;

export const {add} = ToDoSlice.actions;

