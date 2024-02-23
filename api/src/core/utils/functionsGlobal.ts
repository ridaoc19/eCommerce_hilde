export const objectString = (data: Record<string, string>) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const cleaned = keys.map((key, index) => {
    const cleanedKey = stringEmpty(key);
    const cleanedValue = stringEmpty(values[index]);
    return `${cleanedKey}${cleanedValue}`;
  });

  return cleaned.join(' ');
}


export const stringEmpty = (text: string): string => {
  // Eliminar caracteres especiales y espacios, conservando letras con tilde y la letra ñ
  const sinCaracteresEspeciales = text.replace(/[^\wáéíóúüñ]+/g, '');

  // Convertir a minúsculas
  return sinCaracteresEspeciales.toLowerCase();
};
