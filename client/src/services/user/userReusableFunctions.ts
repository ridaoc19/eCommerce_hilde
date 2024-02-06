export const clearUserError = <T extends { error: Record<string, string> }>(
  removeError: () => void, stateClearError: (data: any) => void, initialState: T, state: T) => {
  const newErrorState = { ...state, error: initialState.error };
  removeError();
  stateClearError(newErrorState);
};

