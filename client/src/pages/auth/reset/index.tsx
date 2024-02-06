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
import Reset from './Reset';
import Success from './Success';


export enum ResetButtonName {
  Save = 'save',
  Back = 'back',
}
interface InitialStateReset {
  change: RequestMapUser[RouteUser.Reset]['requestData']
  error: RequestMapUser[RouteUser.Reset]['requestData']
}

const initialStateReset: InitialStateReset = {
  change: { email: "" },
  error: { email: "" }
}

export type {
  HandleChangeText,
  HandleClick,
  InitialStateReset
};

  export {
    Input, RouteUser, Spinner, Success,
    Svg, clearUserError, initialStateReset, useEffect, useMutationUser, useNavigate, useState, useValidations
  };

export default Reset;