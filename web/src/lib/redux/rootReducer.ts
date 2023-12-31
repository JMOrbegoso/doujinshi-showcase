/* Instruments */
import { showcaseApi } from '@/services/showcase-api';
import {
  darkModeSlice,
  quantityOfDoujinshiShownOnHomePageSlice,
  verticalSwipeSlice,
} from './slices';

export const reducer = {
  [showcaseApi.reducerPath]: showcaseApi.reducer,
  darkMode: darkModeSlice.reducer,
  quantityOfDoujinshiShownOnHomePage: quantityOfDoujinshiShownOnHomePageSlice.reducer,
  verticalSwipe: verticalSwipeSlice.reducer,
};
