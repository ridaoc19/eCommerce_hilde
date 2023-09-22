import { useEffect, useState } from 'react';
import useProductFilter, { BreadcrumbItem } from "../../../../hooks/useProductFilter";
import { IProduct } from "../../../../interfaces/product.interface";
import { ProductsListProps } from './interface.ProductEntry';

interface NestedData {
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
  change: {
    department: string
    category: string
    subcategory: string
    product: string
  }
}

// Función auxiliar para acceder a propiedades anidadas de manera segura
function getProperty<T>(obj: T, path: keyof T): T[keyof T] {
  return obj[path];
}

const initialState: InitialState = {
  _id: "",
  intactData: {} as NestedData,
  data: {
    department: [],
    category: [],
    subcategory: [],
    product: [],
  },
  breadcrumb: [],
  change: { department: "", category: "", subcategory: "", product: "" }
}

function ProductEntryList({ handleOnClick }: ProductsListProps) {
  const [state, setState] = useState<InitialState>(initialState);
  const { _id, breadcrumb, data: { department, category, subcategory, product } } = state;
  const { findItemById } = useProductFilter();

  useEffect(() => {
    let res = findItemById({ id: _id })
    const updateData = { ...state.data, department: res.department.data, category: res.category.data, subcategory: res.subcategory.data, product: res.product.data }
    setState(prevState => ({ ...prevState, breadcrumb: res.breadcrumb, data: updateData, intactData: updateData }))
    // eslint-disable-next-line
  }, [_id])

  const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { name, value } = event.target as HTMLFormElement
    if (name !== 'product') handleOnClick(event)
    setState(prevState => ({ ...prevState, _id: value }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Acceder a las propiedades anidadas de 'data' de manera segura
    const currentValue = getProperty(state.intactData, name as keyof NestedData);
    const resFilter = currentValue.map(e => e).filter(d => d.name.toString().toLowerCase().includes(value.toLowerCase()))
    setState(prevState => ({ ...prevState, data: { ...prevState.data, [name]: resFilter }, change: { ...prevState.change, [name]: value } }))
  }

  return (
    <div>
      <div>
        {/* <button name='clear' value={''} onClick={handleClickFilter}>limpiar Filtros</button> */}
        <div className='product_entry_breadcrumb'>
          {breadcrumb.map((item, index) => (
            <span key={item._id}>
              <button value={item._id} onClick={handleClickFilter} className='button_link'>
                {item.name}
              </button >
              {index < breadcrumb.length - 1 && ' > '}
            </span>
          ))}
        </div>
        <div>
          <h2>Departamento</h2>
          <input type="text" name="department" value={state.change.department} onChange={handleChange} />
          {department.map(dep => {
            return (
              <div key={dep._id}>
                <button name='department' onClick={handleClickFilter} value={dep._id}>{dep.name}</button>
              </div>
            )
          })}
        </div>
        <div>
          <h2>Categoría</h2>
          <input type="text" name="category" value={state.change.category} onChange={handleChange} />
          {category.map(cat => {
            return (
              <div key={cat._id}>
                <button name='category' onClick={handleClickFilter} value={cat._id}>{cat.name}</button>
              </div>
            )
          })}
        </div>
        <div>
          <h2>Subcategoría</h2>
          <input type="text" name="subcategory" value={state.change.subcategory} onChange={handleChange} />
          {subcategory.map(sub => {
            return (
              <div key={sub._id}>
                <button name='subcategory' onClick={handleClickFilter} value={sub._id}>{sub.name}</button>
              </div>
            )
          })}
        </div>
        <div>
          <h2>Productos</h2>
          <input type="text" name="product" value={state.change.product} onChange={handleChange} />
          {product.map(pro => {
            return (
              <div key={pro._id}>
                <button name='product' onClick={(event) => {
                  handleClickFilter(event)
                  handleOnClick(event)
                }} value={pro._id}>{pro.name}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductEntryList;
