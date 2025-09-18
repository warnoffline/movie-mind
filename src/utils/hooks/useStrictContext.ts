import * as React from 'react';

const DEFAULT_MESSAGE = 'useStrictContext is not in UseStrictContextProvider';

type UseStrictContextParams<T> = {
  context: React.Context<T | null>;
  message?: string;
};

export const useStrictContext = <T>({
  context,
  message = DEFAULT_MESSAGE,
}: UseStrictContextParams<T>): T => {
  const value = React.useContext(context);

  if (value === null) {
    throw new Error(message);
  }

  return value;
};
