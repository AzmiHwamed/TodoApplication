  import { configureStore } from '@reduxjs/toolkit';
  import taskReducer from './slices/TaskSlice';
  import authReducer from './slices/AuthSlice';

  const store = configureStore({
    reducer: {
      auth: authReducer ,
      tasks: taskReducer,
    },
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  console.log('Store initialized:', authReducer);

  export default store;
