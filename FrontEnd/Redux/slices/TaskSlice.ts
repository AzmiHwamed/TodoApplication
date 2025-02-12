import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../client';

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  priority: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

interface CreateTaskPayload {
  title: string;
  description: string;
  priority: string;
}

interface UpdateTaskPayload {
  id: number;
  updates: Partial<Task>;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[], void>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get('/task/me');
      return response.data as Task[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk<Task, CreateTaskPayload>(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await client.post('/task', taskData);
      return response.data as Task;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk<Task, UpdateTaskPayload>(
  'tasks/updateTask',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await client.patch(`/task/${id}`, updates);
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk<number, number>(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await client.delete(`/task/${taskId}`);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); 
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.loading = false;
      })
      .addMatcher(
        (action): action is ReturnType<typeof fetchTasks.pending | typeof createTask.pending | typeof updateTask.pending | typeof deleteTask.pending> =>
          action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action): action is ReturnType<typeof fetchTasks.rejected | typeof createTask.rejected | typeof updateTask.rejected | typeof deleteTask.rejected> =>
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default taskSlice.reducer;
