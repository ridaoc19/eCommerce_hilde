import { createContext } from "react";
import StateDashboard from "./dashboard/State";
import { IContextData } from "../../utils/interface/context";

export const CreateContext = createContext<IContextData | null>(null);

export const StoreContext = ({ children }: any) => {

  const dashboard = StateDashboard();

  return (
    <CreateContext.Provider
      value={{ dashboard }}>
      {children}
    </CreateContext.Provider>
  );
}
