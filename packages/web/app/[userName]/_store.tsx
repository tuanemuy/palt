import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Tag } from "core/post";

export type State = {
  inputText: {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  };
  inputTags: {
    value: { [key: string]: Tag | undefined };
    setValue: Dispatch<SetStateAction<{ [key: string]: Tag | undefined }>>;
  };
};

export const Store = createContext({} as State);

export function StoreProvider(props: { children: ReactNode }) {
  const [inputText, setInputText] = useState("");
  const [inputTags, setInputTags] = useState<{
    [key: string]: Tag | undefined;
  }>({});

  return (
    <Store.Provider
      value={{
        inputText: {
          value: inputText,
          setValue: setInputText,
        },
        inputTags: {
          value: inputTags,
          setValue: setInputTags,
        },
      }}
    >
      {props.children}
    </Store.Provider>
  );
}
