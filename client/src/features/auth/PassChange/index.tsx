import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from "../../../assets/icons/Svg";
import Spinner from '../../../components/common/spinner';
import UserInput from '../../../components/common/userInput/UserInput';
import useMutationUser from '../../../hooks/useMutationUser';
import useValidations from '../../../hooks/useValidations';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { RequestMapUser, RouteUser } from '../../../services/userRequest';
import { clearUserError } from '../../../utils/userReusableFunctions';
import PassChange from './PassChange';
import Success from './Success';


export enum ChangeButtonName {
  Save = 'save',
  Back = 'back',
}
export interface InitialStateChange {
  change: RequestMapUser[RouteUser.Change]['requestData']
  error: RequestMapUser[RouteUser.Change]['requestData']
}

export type {
  HandleChangeText,
  HandleClick
};

export {
  RouteUser, Spinner, Success,
  Svg, UserInput, clearUserError, useEffect, useMutationUser, useNavigate, useState, useValidations
};

export default PassChange;












// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useUserOnChange from "../../../hooks/useUserOnChange";
// import { IUserComponents, IUserOnChange } from "../../../interfaces/user.interface";
// import { useAppSelector } from "../../../redux/hooks";
// import { selectUserData, selectUserError, selectUserLoading } from "../../../redux/reducers/user";
// import Form from "./Form";
// import Success from "./Success";

// const initialState: IUserOnChange.UseUserOnChange = {
//   password: { change: "", message: "" },
//   confirmPassword: { change: "", message: "" },
// }

// function PassChange() {
//   const navigate = useNavigate();
//   const { change, handleOnChange, handleErrorOnBack } = useUserOnChange(initialState)
//   const errorBack = useAppSelector(selectUserError)
//   const loadingUser = useAppSelector(selectUserLoading)
//   const dataUser = useAppSelector(selectUserData)
//   const [status, setStatus] = useState<IUserComponents.Status>("form");

//   useEffect(() => {
//     if (!dataUser && !loadingUser) return navigate('/login')
//     if (errorBack instanceof Object) handleErrorOnBack()
//     if (errorBack) return setStatus("error")
//     if (loadingUser) return setStatus("loading")
//     if (dataUser instanceof Object && !loadingUser && !errorBack && dataUser?.verified) return setStatus("success")
//     // eslint-disable-next-line
//   }, [loadingUser, dataUser, errorBack])


//   switch (status) {
//     case "success":
//       return <Success />
//     default:
//       return <Form change={change} handleOnChange={handleOnChange} status={status} errorBack={errorBack} />
//   }
// }

// export default PassChange;

