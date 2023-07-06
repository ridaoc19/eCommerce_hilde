

interface InitialState {
  message: string;
  stop: boolean;
}

const initialState = {
  message: "",
  stop: false,
};

export default function validation({ name, value }: { name: string, value: string }): InitialState {

  let error: InitialState = { ...initialState }

  switch (name) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return error = ({ ...error, message: "Ingresa un correo valido" });
      break;

    case "password":
      if (value.length <= 4) {
        error = ({ ...error, message: "Tú contraseña debe tener mínimo 4 caracteres", stop: false })
      } else if (value.length >= 6) {
        error = ({ ...error, message: "Tú contraseña debe tener máximo 6 caracteres", stop: true })
      }
      break;


    default: return error;
  }

  return error;

}