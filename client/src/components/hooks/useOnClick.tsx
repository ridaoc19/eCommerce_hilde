import { FormEvent } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { validationClick } from '../utils/validation';
import { fetchPosts } from '../../redux/reducers/user/actions';

function useOnClick() {
  const dispatch = useAppDispatch()

  const handleOnClick = ({ event, change, handleOnChange }: { event: FormEvent<HTMLFormElement>, change: any, handleOnChange: any }) => {
    event.preventDefault();
    const { name, lastName, email, password, confirmPassword } = change;

    if (validationClick({ change, handleOnChange })) return

    const data = { name: name.change, lastName: lastName.change, email: email.change, password: password.change }
    dispatch(fetchPosts(data))
  }

  return { handleOnClick };
}

export default useOnClick;