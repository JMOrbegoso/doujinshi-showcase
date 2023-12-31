/* Core */
import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

/* Instruments */
import { reducer } from './rootReducer';
import { middlewares } from './middlewares';
import { saveStateInLocalStorage } from '@/helpers';

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middlewares);
  },
});

reduxStore.subscribe(() => {
  saveStateInLocalStorage('darkMode', reduxStore.getState().darkMode.value ? '1' : '0');

  saveStateInLocalStorage(
    'quantityOfDoujinshiShownOnHomePage',
    reduxStore.getState().quantityOfDoujinshiShownOnHomePage.value.toString(),
  );

  saveStateInLocalStorage('verticalSwipe', reduxStore.getState().verticalSwipe.value ? '1' : '0');
});

export const useAppDispatch = () => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
