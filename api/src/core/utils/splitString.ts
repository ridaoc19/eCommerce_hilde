
interface ErrorResponse {
  message: string;
  code?: number;
  name?: string
}

export const splitString = (error: ErrorResponse): {} => {
  const { message, code, name } = error

  if (name === 'MongoServerError' && code === 11000) {
    return { email: 'El correo electrónico ya está registrado' }

  } else {
    const segments = message.split(":").slice(1).join(":").trim().split("<^");
    const object: { [clave: string]: string } = {};

    segments.forEach((segment: string) => {
      const [clave, valor] = segment.replace(",", "").split(":");
      if (clave.trim().length > 0) {
        object[clave.trim()] = valor;
      }
    });
    return object
  }
}