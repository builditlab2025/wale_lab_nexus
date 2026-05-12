// AppContext.ts
import { createContext } from "react";
import { ContextProps } from "./context";

export const Context = createContext<ContextProps | undefined>(undefined);
