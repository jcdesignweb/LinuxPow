import { createSlice, createAction } from '@reduxjs/toolkit';

interface App {
  isLoading: boolean,
  allPackages: any,
  handlerSocket: boolean
}

export const AppEmptyState: App = {
  isLoading: false,
  allPackages: [],
  handlerSocket: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: AppEmptyState,
  reducers: {
    isLoading: (state, action) => { return { ...state, isLoading: action.payload } },
    createAppPackages: (state, action) => action.payload,
    handlerSocket: (state, action) => action.payload,
    setPackages: (state, action) => {
      return {
        ...state, allPackages: action.payload
      }
    },
  }
});

export const { isLoading, setPackages } = appSlice.actions;




export default appSlice.reducer;
