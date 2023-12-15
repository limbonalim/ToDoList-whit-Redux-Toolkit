import {
  ActionReducerMapBuilder,
  createSlice,
  Draft, PayloadAction,
} from '@reduxjs/toolkit';
import {RejectedAction} from '@reduxjs/toolkit/dist/query/core/buildThunks';
import {fetchToDo} from './ToDoThunks';
import {DeletingTask, MutationTask, Task} from '../../types';

export interface ToDoState {
  list: MutationTask[];
  isOpenModal: boolean;
  currentDeletingTask: DeletingTask;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  task: Task;
}

const initialState: ToDoState = {
  list: [],
  isOpenModal: false,
  currentDeletingTask: {
    index: null,
    id: null,
  },
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
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    },
    setIsDeleting: (state, action: PayloadAction<DeletingTask>) => {
      state.currentDeletingTask = action.payload;
      state.list[action.payload.index].isDeleting = true;
    },
    cancelIsDeleting: (state) => {
      if (state.list[state.currentDeletingTask.index].id === state.currentDeletingTask.id) {
        state.list[state.currentDeletingTask.index].isDeleting = false;
        state.currentDeletingTask = {
          index: null,
          id: null
        };
      }
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

export const {
  change,
  refresh,
  closeError,
  openModal,
  closeModal,
  setIsDeleting,
  cancelIsDeleting
} = ToDoSlice.actions;

