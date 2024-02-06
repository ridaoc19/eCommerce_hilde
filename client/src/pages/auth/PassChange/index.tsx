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
  Input, RouteUser, Spinner, Success,
  Svg, clearUserError, useEffect, useMutationUser, useNavigate, useState, useValidations
};

export default PassChange;
