import { BreadcrumbItem } from "../../../../hooks/useProductFilter";
import { IProduct } from "../../../../interfaces/product.interface";
import { MakeProductsRequestReturn, RequestMap, Route, makeProductsRequest } from "../../../../services/productApi";


export enum ButtonName {
  Edit = 'edit',
  Delete = 'delete',
  Clean = 'clean',
  Save = 'save',
  Add = 'add',
  Confirm = 'confirm',
  Cancel = 'cancel',
  FilterProduct = 'filterProduct',
  FilterOpenForm = 'filterOpenForm',
  AddVariant = 'addVariant',
  RemoveVariant = 'removeVariant',
  EditVariant = 'editVariant',
}


export interface NestedData {
  department: IProduct.Department[]
  category: IProduct.Category[]
  subcategory: IProduct.Subcategory[]
  product: IProduct.Product[]
}

export interface InitialState {
  _id: string;
  intactData: NestedData;
  data: NestedData;
  breadcrumb: BreadcrumbItem[];
  changeList: {
    department: string
    category: string
    subcategory: string
    product: string
  }
  changeForm: IProduct.Variants
  selectedProduct: Omit<RequestMap[Route.ProductEntry], 'route'>;
}

export type HandleOnClick = (data: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLLIElement, MouseEvent>) => void
export type HandleOnChange = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void

export type ProductsListProps = {
  state: InitialState;
  // isLoading: boolean;
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
};

export interface ProductEntryFormProps {
  state: InitialState;
  // isLoading: boolean;
  handleOnChange: HandleOnChange;
  handleOnClick: HandleOnClick;
}

export const callApiProductEntry = async (selectedProduct: InitialState['selectedProduct']): Promise<MakeProductsRequestReturn> => {
  const { productId, requestData } = selectedProduct;
  const response = await makeProductsRequest(Route.ProductEntry).withOptions({ productId, requestData })
  return response;
}

// Función auxiliar para acceder a propiedades anidadas de manera segura
export function getProperty<T>(obj: T, path: keyof T): T[keyof T] {
  return obj[path];
}

type ColorItem = {
  name: string;
  code: string;
};

export const colors: ColorItem[] = [
  { name: "Blanco", code: "#FFFFFF" },
  { name: "Lavanda Blanca", code: "#FFF0F5" },
  { name: "Marfil", code: "#FFFFF0" },
  { name: "Amarillo Limón", code: "#FFFFE0" },
  { name: "Amarillo", code: "#FFFF00" },
  { name: "Amarillo Dorado", code: "#FFD700" },
  { name: "Coral", code: "#FF6B6B" },
  { name: "Coral Claro", code: "#F08080" },
  { name: "Salmón", code: "#FA8072" },
  { name: "Rosado", code: "#FFC0CB" },
  { name: "Lavanda Rosa", code: "#FFF0F5" },
  { name: "Lavanda", code: "#E6E6FA" },
  { name: "Lavanda Gris", code: "#D3D3D3" },
  { name: "Lavanda Azul", code: "#6A5ACD" },
  { name: "Azul Lavanda", code: "#CCCCFF" },
  { name: "Azul Acero", code: "#4682B4" },
  { name: "Azul Marino", code: "#000080" },
  { name: "Azul Real", code: "#4169E1" },
  { name: "Azul Claro", code: "#ADD8E6" },
  { name: "Azul Cielo", code: "#87CEEB" },
  { name: "Azul Oscuro", code: "#00008B" },
  { name: "Azul Verde", code: "#008080" },
  { name: "Teal", code: "#008080" },
  { name: "Cian Oscuro", code: "#008B8B" },
  { name: "Cían", code: "#00FFFF" },
  { name: "Turquesa Claro", code: "#00CED1" },
  { name: "Turquesa", code: "#40E0D0" },
  { name: "Verde Mar", code: "#2E8B57" },
  { name: "Verde Lima", code: "#00FF00" },
  { name: "Verde", code: "#008000" },
  { name: "Verde Oliva Oscuro", code: "#556B2F" },
  { name: "Verde Oliva", code: "#808000" },
  { name: "Verde Musgo", code: "#ADFF2F" },
  { name: "Verde Bosque", code: "#228B22" },
  { name: "Verde Manzana", code: "#7FFF00" },
  { name: "Verde Limón", code: "#32CD32" },
  { name: "Verde Gris", code: "#98FB98" },
  { name: "Verde Oscuro", code: "#006400" },
  { name: "Marrón", code: "#A52A2A" },
  { name: "Marrón Saddle", code: "#8B4513" },
  { name: "Chocolate", code: "#D2691E" },
  { name: "Rojo Oscuro", code: "#8B0000" },
  { name: "Rojo", code: "#FF0000" },
  { name: "Firebrick", code: "#B22222" },
  { name: "Naranja Oscuro", code: "#FF8C00" },
  { name: "Naranja", code: "#FFA500" },
  { name: "Oro Oscuro", code: "#B8860B" },
  { name: "Oro", code: "#FFD700" },
  { name: "Oro Antiguo", code: "#FFD700" },
  { name: "Plateado", code: "#C0C0C0" },
  { name: "Gris", code: "#808080" },
  { name: "Gris Oscuro", code: "#666666" },
  { name: "Negro", code: "#000000" },
];

