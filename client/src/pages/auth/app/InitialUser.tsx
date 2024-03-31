import { useContext } from "react";
import { CreateContext } from "../../../hooks/useContext";
import useQueryUser from "../../../hooks/useQueryUser";
import { IUser } from "../../../interfaces/user.interface";
import { RouteUser } from "../../../services/user/userRequest";

function InitialUser() {
  // const { tools } = useMutationUser();
  const { dashboard: { stateDashboard: { login } } } = useContext(CreateContext)
  const token: IUser.UserData['token'] = localStorage?.token || ""

  useQueryUser<RouteUser.Token>(RouteUser.Token, { requestData: { token } }, !!token && !login.isLogin);

  // useEffect(() => {
  //   if (!!token && !login.isLogin) {
  //     console.log({ token, login }, "entro")
  //     tools.fetch(RouteUser.Token).options({ requestData: { token } })
  //   }
  // }, [token, login.isLogin])
  return null;
}

export default InitialUser;