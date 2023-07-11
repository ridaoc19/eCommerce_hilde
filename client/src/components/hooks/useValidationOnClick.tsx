import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { validationClick } from '../utils/validation';
import { fetchPosts } from '../../redux/reducers/user/actions';

interface Value {
  change: string,
  message: string
}

function useValidationOnClick() {
  const [sendData, setSendData] = useState({})
  const dispatch = useAppDispatch()

  const validationOnClick = ({ change, handleOnChange }: { change: Record<string, Value>, handleOnChange: any }) => {

    if (validationClick({ change, handleOnChange })) return
    const sendingData: Record<string, any> = {};
    Object.entries(change).forEach(([name, value]: [string, Value]) => {
      sendingData[name] = value.change
    });
    setSendData(sendingData)
  }

  return { validationOnClick, sendData };
}

export default useValidationOnClick;