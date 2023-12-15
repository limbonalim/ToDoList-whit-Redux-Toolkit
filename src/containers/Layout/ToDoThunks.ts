import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axios-api';
import {ApiTask, ApiTasks} from '../../types';

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