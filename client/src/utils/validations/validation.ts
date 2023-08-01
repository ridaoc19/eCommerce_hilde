import { IValidation } from "../../interfaces/utils/validation.interface";

const initialState: IValidation.ValidationChangeReturn = {
  message: "",
  stop: false,
};

export const validationChange: IValidation.ValidationChangeProps = ({ name, value, change }) => {

  let error: IValidation.ValidationChangeReturn = { ...initialState }
  const updateError = ({ message, stop = false }: IValidation.ValidationChangeReturn) => { return { ...error, message, stop } }
  const { blankSpaces, requiredField, maximumCharacters, minimumCharacters } = repeatedMessages;

  switch (name) {
    case "email":
      if (value.length === 0) return updateError({ message: requiredField })
      if (value.includes(" ")) return error = updateError({ message: blankSpaces })
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return error = ({ ...error, message: "Ingresa un correo valido" });
      break;

    case "password":
      if (value.length === 0) return updateError({ message: requiredField })
      if (value.includes(" ")) return error = updateError({ message: blankSpaces })
      if (value.length <= 5) {
        error = ({ ...error, message: minimumCharacters(value.length, 5) })
      } else if (value.length > 15) {
        error = ({ ...error, message: maximumCharacters(value.length, 15), stop: true })
      }
      break;

    case "confirmPassword":
      if (value.length === 0) return updateError({ message: requiredField })
      if (change.password.change !== value) {
        error = ({ ...error, message: "Tú contraseña no coincide", stop: false })
      }
      break;

    case "name":
      if (value.length === 0) return updateError({ message: requiredField })
      if (value.length <= 3) {
        error = ({ ...error, message: minimumCharacters(value.length, 3) })
      } else if (value.length > 30) {
        error = ({ ...error, message: maximumCharacters(value.length, 30), stop: true })
      }
      break

    case "lastName":
      if (value.length === 0) return updateError({ message: requiredField })
      if (value.length <= 5) {
        error = ({ ...error, message: minimumCharacters(value.length, 5) })
      } else if (value.length > 30) {
        error = ({ ...error, message: maximumCharacters(value.length, 30), stop: true })
      }
      break

    case "phone":
      if (value.length === 0) return updateError({ message: requiredField })
      if (value.length <= 7) {
        error = ({ ...error, message: minimumCharacters(value.length, 7) })
      } else if (value.length >= 12) {
        error = ({ ...error, message: maximumCharacters(value.length, 12), stop: true })
      }
      break

    default: return error;
  }

  return error;

}

const repeatedMessages = {
  blankSpaces: "No debe contener espacios en blanco entre palabras.",
  requiredField: "Campo requerido",
  minimumCharacters: (value: number, total: number): string => `Tienes ${value} caracteres y debe tener mínimo ${total}`,
  maximumCharacters: (value: number, total: number): string => `Tienes ${value} caracteres y debe tener máximo ${total}`
}


export const validationClick: IValidation.ValidationClickProps = ({ change, handleOnChange, routes }) => {
  const dataPost: IValidation.DataPost = { routes }

  const filterError = Object.entries(change).map(([name, value]: IValidation.EntriesProps) => {
    handleOnChange({ name, value: value.change });
    const { message } = validationChange({ name, value: value.change, change })
    dataPost[name] = value.change
    return message
  })
  return { dataPost, authorize: filterError.filter(e => e).length === 0 }
}
