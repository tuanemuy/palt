import { createContext } from "react";

type State = {
  tagIds?: string[];
  text?: string;
};

export const StateContext = createContext<State>({
  tagIds: undefined,
  text: undefined,
});
