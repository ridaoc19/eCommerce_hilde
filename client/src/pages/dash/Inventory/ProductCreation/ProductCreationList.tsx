import { Dispatch, SetStateAction } from "react";
import Svg from "../../../../components/assets/icons/Svg";
import Button from "../../../../components/common/button/Button";
import { isVariant } from "../../../../interfaces/product.interface";
import { RequestMapNavigation, RouteNavigation } from "../../../../services/navigation/navigationRequest";
import { RouteProduct } from "../../../../services/product/productRequest";
import { InitialStateProductCreation } from "./useProductCreationQuery";

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
          <div key={index} className="product-creation-list">
            <div className="product-creation-list__title">
              <h3>{key}</h3>
              {typedKey === 'department' && (
                <div className="product-creation-list__title-new-department">
                  <button onClick={() => {
                    setStateProductCreation(prevState => ({ ...prevState, mutation: { ...prevState.mutation, entity: 'department', paramId: '', route: RouteProduct.DepartmentCreate } }))
                  }}>
                    {Svg({ type: "increase", width: 16, height: 16 })}
                  </button>
                </div>
              )}
            </div>

            <ul className="product-creation-list__content">
              {value.map((item, ind) => {
                // const text = Object.entries(item).filter(([k]) => k === key).flat()[1] || ''
                // const id = Object.entries(item).filter(([k]) => k === `${key}_id`).flat()[1] || ''
                const text = 'product_id' in item ? item.product : 'department_id' in item ? item.department : 'category_id' in item ? item.category : 'subcategory_id' in item ? item.subcategory : item.variant_id
                const id = 'product_id' in item ? item.product_id : 'department_id' in item ? item.department_id : 'category_id' in item ? item.category_id : 'subcategory_id' in item ? item.subcategory_id : item.variant_id
                if (!id) return
                return (
                  <li key={`${ind}abc`} className="product-creation-list__item">
                    <Button button={{
                      type: 'highlighter',
                      // text,
                      text: isVariant(item) ? (
                        <div className="product-creation-list__item-button">
                          {item.images?.slice(0, 1).map((img, i) => <img key={`${i}-${img}`} height={30} src={img} alt=""></img>)}
                          {Object.keys(item.attributes).length > 0 && Object.entries(item.attributes).map(([name, val], i) => <div key={`${i}-${name}`}><b>{name}:</b> <i>{!!val && val.toString()}</i></div>)}
                        </div>
                      ) : text,
                      handleClick: () => {
                        setStateProductCreation(prevState => ({
                          ...prevState,
                          query: {
                            ...prevState.query,
                            entity: typedKey,
                            search: id,
                            type: 'selected',
                          }
                        }))
                      }
                    }} />

                    <div className="product-creation-list__edit">
                      <button onClick={() => {
                        setStateProductCreation(prevState => ({
                          ...prevState,
                          mutation: {
                            ...prevState.mutation,
                            entity: typedKey,
                            paramId: id,
                            route: key === 'department' ? RouteProduct.DepartmentEdit : key === 'category' ? RouteProduct.CategoryEdit : key === 'subcategory' ? RouteProduct.SubCategoryEdit : key === 'product' ? RouteProduct.ProductEdit : RouteProduct.VariantEdit
                          },
                        }))
                      }}>{Svg({ type: "edit", width: 16, height: 16 })}
                      </button>
                    </div>
                    <div className="product-creation-list__delete">
                      {/* ELIMINAR */}
                      {/* <button onClick={() => {
                          setStateProductCreation(prevState => ({
                            ...prevState,
                            mutation: {
                              ...prevState.mutation,
                              entity: typedKey,
                              paramId: id,
                              route: key === 'department' ? RouteProduct.DepartmentDelete : key === 'category' ? RouteProduct.CategoryDelete : key === 'subcategory' ? RouteProduct.SubCategoryDelete : key === 'product' ? RouteProduct.ProductDelete : RouteProduct.VariantDelete
                            },
                          }))
                        }}>{Svg({ type: "delete", width: 16, height: 16 })}
                        </button> */}
                    </div>
                    {key !== 'variant' && (
                      <div className="product-creation-list__add">
                        <button onClick={() => {
                          setStateProductCreation(prevState => ({
                            ...prevState,
                            mutation: {
                              ...prevState.mutation,
                              entity: typedKey === 'department' ? 'category' : typedKey === 'category' ? 'subcategory' : typedKey === 'subcategory' ? 'product' : 'variant',
                              paramId: id,
                              route: key === 'department' ? RouteProduct.CategoryCreate : key === 'category' ? RouteProduct.SubCategoryCreate : typedKey === 'subcategory' ? RouteProduct.ProductCreate : RouteProduct.VariantCreate
                            },
                          }))
                        }}>
                          {Svg({ type: "increase", width: 16, height: 16 })}
                        </button>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </>
  );
}

export default ProductCreationList;

// import { Dispatch, SetStateAction } from "react";
// import Svg from "../../../../components/assets/icons/Svg";
// import Button from "../../../../components/common/button/Button";
// import { RequestMapNavigation, RouteNavigation } from "../../../../services/navigation/navigationRequest";
// import { RouteProduct } from "../../../../services/product/productRequest";
// import { InitialStateProductCreation } from "./useProductCreationQuery";

// interface ProductCreationListProps {
//   data: RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data'];
//   stateProductCreation: InitialStateProductCreation
//   setStateProductCreation: Dispatch<SetStateAction<InitialStateProductCreation>>
// }

// type Key = keyof RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data']['filters'];
// type Value = RequestMapNavigation[RouteNavigation.NavigationListProductDashboard]['data']['filters'][Key];

// function ProductCreationList({ data, setStateProductCreation }: ProductCreationListProps) {
//   const listProduct = data?.filters ? Object.entries(data.filters) : [];

//   return (
//     <>
//       {listProduct.length > 0 && listProduct.map(([key, value]: [string, Value], index: number) => {
//         const typedKey = key as Key; // Type assertion
//         return (
//           <div key={index} className="contenedor">
//             <div className="titulo">
//               <h3>{key}</h3>
//               {typedKey === 'department' && <div>{
//                 // NUEVO DEPARTAMENTO
//                 <button onClick={() => {
//                   setStateProductCreation(prevState => ({ ...prevState, mutation: { ...prevState.mutation, entity: 'department', paramId: '', route: RouteProduct.DepartmentCreate } }))
//                 }}>
//                   {Svg({ type: "increase", width: 16, height: 16 })}
//                 </button>}

//               </div>}
//             </div>

//             <div className="contenido" style={{ overflow: 'auto', height: '100%' }}>
//               {value.map((item, ind) => {
//                 const text = Object.entries(item).filter(([k]) => k === key).flat()[1] || ''
//                 const id = Object.entries(item).filter(([k]) => k === `${key}_id`).flat()[1] || ''
//                 return (
//                   <div key={`${ind}abc`} style={{ display: 'flex' }}>
//                     {/* NOMBRE */}
//                     <Button button={{
//                       type: 'highlighter',
//                       text,
//                       // text: Object.values(item)[0],
//                       handleClick: () => {
//                         setStateProductCreation(prevState => ({
//                           ...prevState,
//                           // mutation: { ...prevState.mutation, entity: key === 'department' ? 'department' : key === 'category' ? 'category' : key === 'subcategory' ? 'subcategory' : 'product', paramId: id, route: key === 'department' ? RouteProduct.DepartmentEdit : key === 'category' ? RouteProduct.CategoryEdit : key === 'subcategory' ? RouteProduct.SubCategoryEdit : RouteProduct.ProductEdit },
//                           query: {
//                             ...prevState.query,
//                             entity: typedKey,
//                             search: id,
//                             type: 'selected',
//                           }
//                         }))
//                       }
//                     }} />

//                     <div>{
//                       // EDITAR
//                       <button onClick={() => {
//                         setStateProductCreation(prevState => ({
//                           ...prevState,
//                           mutation: {
//                             ...prevState.mutation,
//                             entity: typedKey,
//                             paramId: id,
//                             route: key === 'department' ? RouteProduct.DepartmentEdit : key === 'category' ? RouteProduct.CategoryEdit : key === 'subcategory' ? RouteProduct.SubCategoryEdit : key === 'product' ? RouteProduct.ProductEdit : RouteProduct.VariantEdit
//                           },
//                         }))
//                       }}>{Svg({ type: "edit", width: 16, height: 16 })}
//                       </button>

//                     }
//                     </div>
//                     <div>{
//                       // ELIMINAR
//                       // <button onClick={() => {
//                       //   setStateProductCreation(prevState => ({
//                       //     ...prevState,
//                       //     mutation: {
//                       //       ...prevState.mutation,
//                       //       entity: typedKey,
//                       //       paramId: id,
//                       //       route: key === 'department' ? RouteProduct.DepartmentDelete : key === 'category' ? RouteProduct.CategoryDelete : key === 'subcategory' ? RouteProduct.SubCategoryDelete : key === 'product' ? RouteProduct.ProductDelete : RouteProduct.VariantDelete
//                       //     },
//                       //   }))
//                       // }}>{Svg({ type: "delete", width: 16, height: 16 })}
//                       // </button>
//                       }

//                     </div>
//                     {key !== 'variant' && <div>{
//                       // AGREGAR EL SIGUIENTE -------------------------------------------------
//                       <button
//                         onClick={() => {
//                           setStateProductCreation(prevState => ({
//                             ...prevState,
//                             mutation: {
//                               ...prevState.mutation,
//                               entity: typedKey === 'department' ? 'category' : typedKey === 'category' ? 'subcategory' : typedKey === 'subcategory' ? 'product' : 'variant',
//                               paramId: id,
//                               route: key === 'department' ? RouteProduct.CategoryCreate : key === 'category' ? RouteProduct.SubCategoryCreate : typedKey === 'subcategory' ? RouteProduct.ProductCreate : RouteProduct.VariantCreate
//                             },
//                           }))
//                         }
//                         }>
//                         {Svg({ type: "increase", width: 16, height: 16 })}
//                       </button>}
//                     </div>}
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         )
//       })}
//     </>
//   );
// }

// export default ProductCreationList;