export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem(state);
    if (serializedState === null) {
      return null;
    }
    if (serializedState.length <= 0) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { error: err };
  }
};
