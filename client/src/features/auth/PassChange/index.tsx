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
