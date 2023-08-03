import { createContext } from "react";
import StateDashboard from "./dashboard/State";
import { IContextData, StoreContextProps } from "../../interfaces/hooks/context.interface";

export const CreateContext = createContext<IContextData | null>(null);

export const StoreContext = ({ children }: StoreContextProps) => {
  const dashboard = StateDashboard();

  return (
    <CreateContext.Provider
      value={{ dashboard }}>
      {children}
    </CreateContext.Provider>
  );
}