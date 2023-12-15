import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axios-api';
import {RootState} from '../../app/store';
import {ApiTasks, MutationTask, Task} from '../../types';

export const fetchToDo = createAsyncThunk<MutationTask[]>(
  'toDo/fetch',
  async () => {
    const response = await axiosApi.get<ApiTasks | null>('/tasks.json');
    if (response.data) {
      const keys: string[] = Object.keys(response.data);
      return keys.map((id: string): MutationTask => {
        return {
          ...response.data[id],
          id,
          isDeleting: false,
        };
      });
    } else {
      return [];
    }
  }
);

export const addTaskInToDo = createAsyncThunk<void, undefined, { state: RootState }>(
  'toDo/add',
  async (arg, thunkAPI) => {
    const task = thunkAPI.getState().toDo.task;
    await axiosApi.post<Task>('/tasks.json', task);
  }
);

export const deleteTaskFromToDo = createAsyncThunk<void, string>(
  'ToDo/delete',
  async (id) => {
    await axiosApi.delete(`/tasks/${id}.json`);
  }
);

export const changeOldTaskInToDo = createAsyncThunk<void, string, { state: RootState }>(
  'ToDo/changeOld',
  async (id, thunkAPI) => {
    const index: number = thunkAPI.getState().toDo.list.findIndex((task) => task.id === id);
    if (index >= 0) {
      const task: MutationTask = thunkAPI.getState().toDo.list[index];
      const newTask: Task = {
        title: task.title,
        isDone: !task.isDone,
      };
      await axiosApi.put(`/tasks/${id}.json`, newTask);
    }
  }
);