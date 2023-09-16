import { useContext, useEffect } from 'react';
import { useRoutes } from "react-router-dom";
import { CreateContext } from "../hooks/useContext";
import { ActionTypeDashboard } from "../hooks/useContext/dash/reducer";
import { IContext } from "../interfaces/hooks/context.interface";
import Auth from "./content/Auth";
import Dash from "./content/Dash";
import Feature from "./content/Feature";

export default function Routes({ isLoading }: { isLoading: boolean }) {
  const { dashboard: { dispatch: dispatchContext } }: IContext.IContextData = useContext(CreateContext)!

  useEffect(() => {
    dispatchContext({ type: ActionTypeDashboard.IS_LOADING_UPDATE, payload: { name: null, value: JSON.stringify(isLoading) } })
    // eslint-disable-next-line
  }, [isLoading])

  return useRoutes([...Feature, Auth, Dash])
}