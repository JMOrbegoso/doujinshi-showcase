/* Instruments */
import type { ReduxThunkAction } from '@/lib/redux';
import { darkModeSlice } from './darkModeSlice';

export const setLightTheme = (): ReduxThunkAction => (dispatch) => {
  dispatch(darkModeSlice.actions.setLightTheme());
  document.documentElement.classList.remove('dark');
};

export const setDarkTheme = (): ReduxThunkAction => (dispatch) => {
  dispatch(darkModeSlice.actions.setDarkTheme());
  document.documentElement.classList.add('dark');
};
