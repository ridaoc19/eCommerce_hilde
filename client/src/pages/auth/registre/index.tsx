import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Svg from '../../../components/assets/icons/Svg';
import Input from '../../../components/common/Input/Input';
import Spinner from '../../../components/common/spinner';
import useMutationUser from '../../../hooks/useMutationUser';
import useValidations from '../../../hooks/useValidations/useValidations';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { IUser } from '../../../interfaces/user.interface';
import { RouteUser } from '../../../services/user/userRequest';
import { clearUserError } from '../../../services/user/userReusableFunctions';
import Registre from './Registre';
import Success from './Success';

export enum RegistreButtonName {
  Save = 'save',
  Back = 'back',
}
export interface InitialStateRegistre {
  change: Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone'>
  error: Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone'>
}

const initialStateRegistre: InitialStateRegistre = {
  change: { name: "", lastName: "", email: "", phone: "", },
  error: { name: "", lastName: "", email: "", phone: "", },
}

export type {
  HandleChangeText,
  HandleClick
};

  export {
    Input, RouteUser, Spinner, Success,
    Svg, clearUserError, initialStateRegistre, useEffect, useMutationUser, useNavigate, useState, useValidations
  };

export default Registre;

