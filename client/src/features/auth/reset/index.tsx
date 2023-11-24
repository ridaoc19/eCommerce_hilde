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
    RouteUser, Spinner, Success,
    Svg, UserInput, clearUserError, initialStateReset, useEffect, useMutationUser, useNavigate, useState, useValidations
  };

export default Reset;