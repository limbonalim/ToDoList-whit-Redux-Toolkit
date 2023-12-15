import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axios-api';
import {ApiTask, ApiTasks, Task} from '../../types';
import {RootState} from '../../app/store';

export const fetchToDo = createAsyncThunk<ApiTask[]>(
  'toDo/fetch',
  async () => {
    const response = await axiosApi.get<ApiTasks | null>('/tasks.json');
    if (response.data) {
      const keys: string[] = Object.keys(response.data);
      return keys.map((id: string): ApiTask => {
        return {
          ...response.data[id],
          id
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
      const task: ApiTask = thunkAPI.getState().toDo.list[index];
      const newTask: Task = {
        title: task.title,
        isDone: !task.isDone,
      };
      await axiosApi.put(`/tasks/${id}.json`, newTask);
    }
  }
);