import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from '../../../components/assets/icons/Svg';
import Input from '../../../components/common/Input/Input';
import Spinner from '../../../components/common/spinner';
import useMutationUser from '../../../hooks/useMutationUser';
import useValidations from '../../../hooks/useValidations/useValidations';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { RequestMapUser, RouteUser } from '../../../services/user/userRequest';
import { clearUserError } from '../../../services/user/userReusableFunctions';
import Login from './Login';
import Success from './Success';


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
  InitialStateLogin
};

  export {
    Input, RouteUser, Spinner, Success,
    Svg, clearUserError, initialStateLogin, useEffect, useMutationUser, useNavigate, useState, useValidations
  };

export default Login;
