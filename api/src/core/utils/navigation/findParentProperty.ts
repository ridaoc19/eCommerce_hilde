import { GenerateFiltersReturn } from "./generateFilters";

export function findParentProperty(obj: GenerateFiltersReturn, targetProperty: string, parentPath: string[] = []): string | null {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...parentPath, key];

    if (key.toLowerCase() === targetProperty.toLowerCase()) {
      // La propiedad se encuentra en este nivel del objeto
      return currentPath[0];
    } else if (typeof value === "object" && value !== null) {
      // La propiedad se podría encontrar en otro subobjeto, así que recursivamente buscamos
      const parentInSubObject = findParentProperty(
        value,
        targetProperty,
        currentPath
      );
      if (parentInSubObject !== null) {
        return parentInSubObject;
      }
    }
  }
  return null; // No se encontró la propiedad
}