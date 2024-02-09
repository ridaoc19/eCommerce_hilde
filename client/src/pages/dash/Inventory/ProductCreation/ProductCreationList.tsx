import { Dispatch, SetStateAction } from "react";
import { RequestMapNavigation, RouteNavigation } from "../../../../services/navigation/navigationRequest";
import { Svg } from "../../../auth/login";
import { InitialStateProductCreation } from "./useProductCreationQuery";
import { RouteProduct } from "../../../../services/product/productRequest";

interface ProductCreationListProps {
  data: RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data'];
  stateProductCreation: InitialStateProductCreation
  setStateProductCreation: Dispatch<SetStateAction<InitialStateProductCreation>>
}

function ProductCreationList({ data, setStateProductCreation }: ProductCreationListProps) {
  return (
    <>
      {Object.entries(data?.filters || {}).map(([key, value], index) => (
        <div key={index} className="contenedor">
          <div className="titulo">
            <h3>{key}</h3>
            {key === 'department' && <div>{

              <button onClick={() => {
                setStateProductCreation(prevState => ({ ...prevState, mutation: { ...prevState.mutation, entity: 'department', paramId: '', route: RouteProduct.DepartmentCreate } }))
              }}>
                {Svg({ type: "increase", width: 16, height: 16 })}
              </button>}

            </div>}
          </div>
          <div className="contenido" style={{ overflow: 'auto', height: '100%' }}>
            {value.map((item, ind) => (
              <div key={`${ind}abc`} style={{ display: 'flex' }}>
                <p>{Object.values(item)[0]}</p>{/* nombre */}
                <div>{

                  <button onClick={() => {
                    setStateProductCreation(prevState => ({
                      ...prevState,
                      mutation: { ...prevState.mutation, entity: key === 'department' ? 'department' : key === 'category' ? 'category' : key === 'subcategory' ? 'subcategory' : 'product', paramId: Object.values(item)[1], route: key === 'department' ? RouteProduct.DepartmentEdit : key === 'category' ? RouteProduct.CategoryEdit : key === 'subcategory' ? RouteProduct.SubCategoryEdit : RouteProduct.ProductEdit },
                    }))
                  }}>{Svg({ type: "edit", width: 16, height: 16 })}
                  </button>

                }
                </div>
                <div>{

                  <button onClick={() => {
                    setStateProductCreation(prevState => ({
                      ...prevState,
                      mutation: { ...prevState.mutation, entity: key === 'department' ? 'department' : key === 'category' ? 'category' : key === 'subcategory' ? 'subcategory' : 'product', paramId: Object.values(item)[1], route: key === 'department' ? RouteProduct.DepartmentDelete : key === 'category' ? RouteProduct.CategoryDelete : key === 'subcategory' ? RouteProduct.SubCategoryDelete : RouteProduct.ProductDelete },
                    }))
                  }}>{Svg({ type: "delete", width: 16, height: 16 })}
                  </button>}

                </div>
                {key !== 'product' && <div>{

                  <button
                    onClick={() => {
                      setStateProductCreation(prevState => ({
                        ...prevState,
                        mutation: { ...prevState.mutation, entity: key === 'department' ? 'category' : key === 'category' ? 'subcategory' : 'product', paramId: Object.values(item)[1], route: key === 'department' ? RouteProduct.CategoryCreate : key === 'category' ? RouteProduct.SubCategoryCreate : RouteProduct.ProductCreate },

                      }))
                    }
                    }>
                    {Svg({ type: "increase", width: 16, height: 16 })}
                  </button>}
                </div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductCreationList;