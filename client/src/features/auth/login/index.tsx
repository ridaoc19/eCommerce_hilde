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
import Success from './Success';
import Login from './Login';

export enum LoginButtonName {
  Reset = 'reset',
  Login = 'login',
  Registre = 'registre',
  Back = 'back',
}
interface InitialStateLogin {
  change: RequestMapUser[RouteUser.Login]['requestData']
  error: RequestMapUser[RouteUser.Login]['requestData']
}

const initialStateLogin: InitialStateLogin = {
  change: { email: "", password: "" },
  error: { email: "", password: "" }
}

export type {
  HandleChangeText,
  HandleClick,
  InitialStateLogin,
};

export {
  RouteUser, Spinner, Success,
  Svg, UserInput, clearUserError, initialStateLogin, useEffect, useMutationUser, useNavigate, useState, useValidations
};

export default Login;
