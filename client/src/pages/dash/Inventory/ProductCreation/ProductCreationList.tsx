import { Dispatch, SetStateAction } from "react";
import { RequestMapNavigation, RouteNavigation } from "../../../../services/navigation/navigationRequest";
import { Svg } from "../../../auth/login";
import { InitialStateProductCreation } from "./useProductCreationQuery";
import { RouteProduct } from "../../../../services/product/productRequest";
import Button from "../../../../components/common/button/Button";

interface ProductCreationListProps {
  data: RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data'];
  stateProductCreation: InitialStateProductCreation
  setStateProductCreation: Dispatch<SetStateAction<InitialStateProductCreation>>
}

type Key = keyof RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data']['filters'];
type Value = RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data']['filters'][Key];

function ProductCreationList({ data, setStateProductCreation }: ProductCreationListProps) {
  const listProduct = data?.filters ? Object.entries(data.filters) : [];

  return (
    <>
      {listProduct.length > 0 && listProduct.map(([key, value]: [string, Value], index: number) => {
        const typedKey = key as Key; // Type assertion
        return (
          <div key={index} className="contenedor">
            <div className="titulo">
              <h3>{key}</h3>
              {typedKey === 'department' && <div>{
                // NUEVO DEPARTAMENTO
                <button onClick={() => {
                  setStateProductCreation(prevState => ({ ...prevState, mutation: { ...prevState.mutation, entity: 'department', paramId: '', route: RouteProduct.DepartmentCreate } }))
                }}>
                  {Svg({ type: "increase", width: 16, height: 16 })}
                </button>}

              </div>}
            </div>

            <div className="contenido" style={{ overflow: 'auto', height: '100%' }}>
              {value.map((item, ind) => {
                const text = Object.entries(item).filter(([k]) => k === key).flat()[1] || ''
                const id = Object.entries(item).filter(([k]) => k === `${key}_id`).flat()[1] || ''
                return (
                  <div key={`${ind}abc`} style={{ display: 'flex' }}>
                    {/* NOMBRE */}
                    <Button button={{
                      type: 'highlighter',
                      text,
                      // text: Object.values(item)[0],
                      handleClick: () => {
                        setStateProductCreation(prevState => ({
                          ...prevState,
                          // mutation: { ...prevState.mutation, entity: key === 'department' ? 'department' : key === 'category' ? 'category' : key === 'subcategory' ? 'subcategory' : 'product', paramId: id, route: key === 'department' ? RouteProduct.DepartmentEdit : key === 'category' ? RouteProduct.CategoryEdit : key === 'subcategory' ? RouteProduct.SubCategoryEdit : RouteProduct.ProductEdit },
                          query: {
                            ...prevState.query,
                            entity: typedKey,
                            search: id,
                            type: 'selected',
                          }
                        }))
                      }
                    }} />

                    <div>{
                      // EDITAR
                      <button onClick={() => {
                        setStateProductCreation(prevState => ({
                          ...prevState,
                          mutation: {
                            ...prevState.mutation,
                            entity: typedKey,
                            paramId: id,
                            route: key === 'department' ? RouteProduct.DepartmentEdit : key === 'category' ? RouteProduct.CategoryEdit : key === 'subcategory' ? RouteProduct.SubCategoryEdit : RouteProduct.ProductEdit
                          },
                        }))
                      }}>{Svg({ type: "edit", width: 16, height: 16 })}
                      </button>

                    }
                    </div>
                    <div>{
                      // ELIMINAR
                      <button onClick={() => {
                        setStateProductCreation(prevState => ({
                          ...prevState,
                          mutation: {
                            ...prevState.mutation,
                            entity: typedKey,
                            paramId: id,
                            route: key === 'department' ? RouteProduct.DepartmentDelete : key === 'category' ? RouteProduct.CategoryDelete : key === 'subcategory' ? RouteProduct.SubCategoryDelete : RouteProduct.ProductDelete
                          },
                        }))
                      }}>{Svg({ type: "delete", width: 16, height: 16 })}
                      </button>}

                    </div>
                    {key !== 'variant' && <div>{
                      // AGREGAR EL SIGUIENTE -------------------------------------------------
                      <button
                        onClick={() => {
                          setStateProductCreation(prevState => ({
                            ...prevState,
                            mutation: {
                              ...prevState.mutation,
                              entity: typedKey === 'department' ? 'category' : typedKey === 'category' ? 'subcategory' : typedKey === 'subcategory' ? 'product' : 'variant',
                              paramId: id,
                              route: key === 'department' ? RouteProduct.CategoryCreate : key === 'category' ? RouteProduct.SubCategoryCreate : typedKey === 'subcategory' ? RouteProduct.ProductCreate : RouteProduct.VariantCreate
                            },
                          }))
                        }
                        }>
                        {Svg({ type: "increase", width: 16, height: 16 })}
                      </button>}
                    </div>}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  );
}

export default ProductCreationList;