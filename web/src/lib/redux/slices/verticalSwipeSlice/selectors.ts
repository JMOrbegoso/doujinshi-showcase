import type { ReduxState } from '@/lib/redux';

export const selectVerticalSwipe = (state: ReduxState): boolean => state.verticalSwipe.value;
