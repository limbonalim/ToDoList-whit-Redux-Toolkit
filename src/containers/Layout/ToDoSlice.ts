import {
  ActionReducerMapBuilder,
  createSlice,
  Draft,
} from '@reduxjs/toolkit';
import {ApiTask, Task} from '../../types';
import {fetchToDo} from './ToDoThunks';
import {RejectedAction} from '@reduxjs/toolkit/dist/query/core/buildThunks';

export interface ToDoState {
  list: ApiTask[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  task: Task;
}

const initialState: ToDoState = {
  list: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
  task: {
    title: '',
    isDone: false,
  }
};

export const ToDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    change: (state, action) => {
      state.task.title = action.payload;
    },
    refresh: (state) => {
      state.task.title = '';
    },
    closeError: (state) => {
      state.isError = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ToDoState>) => {
    builder.addCase(fetchToDo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchToDo.fulfilled, (state: Draft<ToDoState>, action) => {
      state.isLoading = false;
      state.list = action.payload;

    });
    builder.addCase(fetchToDo.rejected, (state, action: RejectedAction<void, void>) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
    });
  }
});

export const ToDoReducer = ToDoSlice.reducer;

export const {change, refresh, closeError} = ToDoSlice.actions;

