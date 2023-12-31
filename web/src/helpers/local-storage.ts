export function saveStateInLocalStorage(key: string, state: string) {
  try {
    const serializedState = state;
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
}

export function loadStateFromLocalStorage(key: string): string | undefined {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState ?? undefined;
  } catch {
    return undefined;
  }
}
