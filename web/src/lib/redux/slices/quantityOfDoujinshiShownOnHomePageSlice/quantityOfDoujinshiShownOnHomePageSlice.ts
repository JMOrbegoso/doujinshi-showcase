import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuantityOfDoujinshiShownOnHomePageSliceState } from './quantityOfDoujinshiShownOnHomePageSliceState';
import { loadStateFromLocalStorage } from '@/helpers';

const initialState: QuantityOfDoujinshiShownOnHomePageSliceState = {
  value: getInitialValue(),
  status: 'idle',
};

function getInitialValue(): number {
  const loadedState = loadStateFromLocalStorage('quantityOfDoujinshiShownOnHomePage');
  if (loadedState === undefined) return 25;

  const state = Number.parseInt(loadedState);
  return state;
}

export const quantityOfDoujinshiShownOnHomePageSlice = createSlice({
  name: 'quantityOfDoujinshiShownOnHomePage',
  initialState,
  reducers: {
    setQuantityOfDoujinshiShownOnHomePage: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});
