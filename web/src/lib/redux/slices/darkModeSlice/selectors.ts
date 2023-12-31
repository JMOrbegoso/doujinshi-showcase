import type { ReduxState } from '@/lib/redux';

export const selectDarkModeStatus = (state: ReduxState): boolean => state.darkMode.value;
