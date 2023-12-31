import { createSlice } from '@reduxjs/toolkit';
import { VerticalSwipeSliceState } from './verticalSwipeSliceState';
import { loadStateFromLocalStorage } from '@/helpers';

const initialState: VerticalSwipeSliceState = {
  value: getInitialValue(),
  status: 'idle',
};

function getInitialValue(): boolean {
  const loadedState = loadStateFromLocalStorage('verticalSwipe');
  if (loadedState === undefined) return false;

  const state = Number.parseInt(loadedState);
  return state === 1;
}

export const verticalSwipeSlice = createSlice({
  name: 'verticalSwipe',
  initialState,
  reducers: {
    switch: (state) => {
      state.value = !state.value;
    },
    disableVerticalSwipe: (state) => {
      state.value = false;
    },
    enableVerticalSwipe: (state) => {
      state.value = true;
    },
  },
});
