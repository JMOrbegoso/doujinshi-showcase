import { createSlice } from '@reduxjs/toolkit';
import { DarkModeSliceState } from './darkModeSliceState';
import { loadStateFromLocalStorage } from '@/helpers';

const initialState: DarkModeSliceState = {
  value: getInitialValue(),
  status: 'idle',
};

function getInitialValue(): boolean {
  const loadedState = loadStateFromLocalStorage('darkMode');
  if (loadedState === undefined) {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }

  const state = Number.parseInt(loadedState);
  return state === 1;
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    switch: (state) => {
      state.value = !state.value;
    },
    setLightTheme: (state) => {
      state.value = false;
    },
    setDarkTheme: (state) => {
      state.value = true;
    },
  },
});
