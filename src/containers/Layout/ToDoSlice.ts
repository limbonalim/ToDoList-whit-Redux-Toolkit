import {
  ActionReducerMapBuilder,
  createSlice,
  Draft,
} from '@reduxjs/toolkit';
import {ApiTask, Task} from '../../types';
import {fetchToDo} from './ToDoThunks';


export interface ToDoState {
  list: ApiTask[];
  isLoading: boolean;
  task: Task;
}

const initialState: ToDoState = {
  list: [],
  isLoading: false,
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
      state.task.title = ''
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

export const {change, refresh} = ToDoSlice.actions;

