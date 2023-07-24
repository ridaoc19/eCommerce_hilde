import { createContext } from "react";
import { IContextData, StoreContextProps } from "../../utils/interface/context";
import StateDashboard from "./dashboard/State";

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