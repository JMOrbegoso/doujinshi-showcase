import type { ReduxState } from '@/lib/redux';

export const selectQuantityOfDoujinshiShownOnHomePage = (state: ReduxState): number =>
  state.quantityOfDoujinshiShownOnHomePage.value;
