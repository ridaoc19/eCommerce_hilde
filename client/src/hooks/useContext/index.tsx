import { createContext } from "react";
import StateDashboard from "./dash/State";
import { IContext } from "../../interfaces/hooks/context.interface";

export const CreateContext = createContext<IContext.IContextData | null>(null);

export const StoreContext = ({ children }: IContext.StoreContextProps) => {
  const dashboard = StateDashboard();

  return (
    <CreateContext.Provider
      value={{ dashboard }}>
      {children}
    </CreateContext.Provider>
  );
}