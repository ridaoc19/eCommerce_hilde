import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/common/spinner';
import UserInput from '../../../components/common/userInput/UserInput';
import useMutationUser from '../../../hooks/useMutationUser';
import useValidations from '../../../hooks/useValidations';
import { HandleChangeText, HandleClick } from '../../../interfaces/global.interface';
import { IUser } from '../../../interfaces/user.interface';
import { clearUserError } from '../../../utils/userReusableFunctions';
import Success from './Success';
import Registre from './Registre';
import { RouteUser } from '../../../services/userRequest';
import Svg from "../../../assets/icons/Svg";

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
  HandleClick,
};

export {
  initialStateRegistre,
  RouteUser,
  useState,
  useEffect,
  useNavigate,
  Spinner,
  UserInput,
  useMutationUser,
  useValidations,
  clearUserError,
  Success,
  Svg,
};

export default Registre;

