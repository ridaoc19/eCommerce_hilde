import { useEffect, useState } from "react";
import useListProduct from "../../../hooks/useListProduct/useListProduct";
import { IProduct } from "../../../interfaces/product.interface";
import ShowcaseMin from "./ShowcaseMin";

interface InitialStateProductDetail {
  selectedVariant: Omit<IProduct.Variant, "product"> | null;
  currentImage: number;
}

const initialStateProductDetail: InitialStateProductDetail = {
  selectedVariant: null,
  currentImage: 0
}

function ProductDetail() {
  const { BreadcrumbComponent, listProducts } = useListProduct();
  const [stateProductDetail, setStateProductDetail] = useState<InitialStateProductDetail>(initialStateProductDetail);

  useEffect(() => {
    if (listProducts.length > 0) {
      const selectProductStock = listProducts[0].variants.find(e => e.stock > 0)
      const selectProductAllStock = listProducts[0].variants[0]
      setStateProductDetail({ ...stateProductDetail, selectedVariant: selectProductStock || selectProductAllStock });
    }
  }, [listProducts]);

  if (listProducts.length === 0 || !stateProductDetail.selectedVariant) return <div className="product-detail">Cargando...</div>;
  const { product: { product, brand, description, specifications, benefits, warranty, contents } } = listProducts[0];
  console.log(stateProductDetail);

  return (
    <>
      <div className='product-detail'>
        {listProducts.length > 0 && (
          <div className="product-detail__container">
            <div className="product-detail__breadcrumb">
              {BreadcrumbComponent}
            </div>

            <div className='product-detail__content'>
              <div className="product-detail__images">

                <div className='images-showcase__container'>
                  <div className='images-showcase__parent'>
                    <img width={"400px"} src={stateProductDetail.selectedVariant.images[stateProductDetail.currentImage]} alt="" />
                  </div>

                  <div className='images-showcase__children'>
                    <ShowcaseMin>
                      {stateProductDetail.selectedVariant.images.map((e, index) => {
                        return (
                          <button key={index} className="showcase-children__button" onClick={() => setStateProductDetail({ ...stateProductDetail, currentImage: index })}>
                            <img src={e} width={"100%"} alt="" />
                          </button>
                        )
                      })}
                    </ShowcaseMin>
                  </div>

                </div>
              </div>

              <div className='product-detail__detail'>

                <div className='product-detail__attributes'>
                  <ShowcaseMin>
                    {listProducts[0].variants.sort((a, b) => b.price - a.price).map(e => {
                      return (
                        <div key={e.variant_id}>
                          <button disabled={e.price === 0} className={`product-detail__attributes-card ${e.price === 0 ? 'disabled' : ''}`} onClick={() => setStateProductDetail({ ...stateProductDetail, selectedVariant: e })}>
                            {e.price === 0 && <span className="no-stock">AGOTADO</span>}
                            <img src={e.images[0]} width={60} alt="" />
                            {Object.values(e.attributes).map((attribute, index) => {
                              return (
                                <div key={index}>
                                  <p>{attribute}</p>
                                </div>
                              )
                            })}
                          </button>
                        </div>
                      )
                    })}
                  </ShowcaseMin>
                  {/* <ShowcaseAttributes >
                    {listProducts[0].variants.sort((a, b) => b.price - a.price).map(e => {
                      return (
                        <div key={e.variant_id}>
                          <button disabled={e.price === 0} className={`product-detail__attributes-card ${e.price === 0 ? 'disabled' : ''}`} onClick={() => setStateProductDetail({ ...stateProductDetail, selectedVariant: e })}>
                            {e.price === 0 && <span className="no-stock">AGOTADO</span>}
                            <img src={e.images[0]} width={60} alt="" />
                            {Object.values(e.attributes).map((attribute, index) => {
                              return (
                                <div key={index}>
                                  <p>{attribute}</p>
                                </div>
                              )
                            })}
                          </button>
                        </div>
                      )
                    })}
                  </ShowcaseAttributes> */}
                </div>

                <div className="product-detail__id">
                  <h6>ID: {stateProductDetail.selectedVariant.variant_id.replace(/-/g, '').toUpperCase()}</h6>
                </div>

                <div className="product-detail__title">
                  <h2>{product}</h2>
                </div>

                <div className="product-detail__brand">
                  <h3>Marca:</h3> <p>{brand}</p>
                </div>

                <div className="product-detail__price">
                  <h3>{stateProductDetail.selectedVariant.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, })}</h3>
                </div>

                <div className="product-detail__benefits">
                  {benefits.length > 0 && <h3>Acerca de este producto</h3>}
                  {benefits.map((ben, index) => (
                    <ul key={index}>
                      <li>{ben}</li>
                    </ul>
                  ))}
                </div>

              </div>
            </div>

            <div className="product-detail__description">
              {description && <h3>Descripción del producto</h3>}
              <p>{description}</p>
            </div>

            <div className="product-detail__warranty">
              {warranty && <h3>Garantía</h3>}
              <p>{warranty}</p>
            </div>

            <div className="product-detail__contents">
              {contents && <h3>Contenido de la caja</h3>}
              <p>{contents}</p>
            </div>

            <div className="product-detail__specification">
              <h2>Especificaciones</h2>
              <h4>{product}</h4>
              <div className="specification-columns">
              {Object.entries(specifications).map(([key, value], index) => (
                <ul key={index}>
                  <li>
                    <h5>{key}</h5>
                    <span>{value}</span>
                  </li>
                </ul>
              ))}
              </div>
            </div>



            <div className="product-detail__showcase">
              {/* {similarProducts.length > 0 && <Showcase title="Productos similares" cardData={similarProducts} />} */}
            </div>
          </div>
        )}
      </div>
    </>

  );
}

export default ProductDetail;


// import {useEffect, useState} from 'react';
// import useListProduct from "../../../hooks/useListProduct/useListProduct";

// interface InitialStateProductDetail {
//   images: {
//     parent: string;
//     children: string[];
//   }
//   attributes: Record<string, Array<string[]>>
//   selectedFilterAttribute: string[]
//   selectedAttribute: string
// }

// const initialStateProductDetail: InitialStateProductDetail = {
//   images: { parent: "", children: [] },
//   attributes: { key: [[]] },
//   selectedFilterAttribute: [],
//   selectedAttribute: "",
// }


// function ProductDetail() {
//   const { BreadcrumbComponent, listProducts } = useListProduct();
//   const [stateProductDetail, setStateProductDetail] = useState<InitialStateProductDetail>(initialStateProductDetail);


//   useEffect(() => {
//     if (listProducts.length > 0) {
//       const filterProductStock = listProducts[0].variants.filter(e => e.stock > 0)

//       const reduce = filterProductStock.reduce((acc: string[], item) => {
//         const values = Object.values(item.attributes);
//         if (values.includes(stateProductDetail.selectedAttribute)) {
//           const unique = new Set([...acc, ...values]);
//           return Array.from(unique);
//         }
//         return acc;
//       }, []);


//       setStateProductDetail({ ...stateProductDetail, selectedFilterAttribute: reduce });
//     }
//   }, [stateProductDetail.selectedAttribute])

//   useEffect(() => {
//     if (listProducts.length > 0) {

//       // Objeto para almacenar la relación entre todas las claves y sus valores únicos
//       const uniqueAttributes: Record<string, Array<string[]>> = {};

//       listProducts[0].variants.forEach(items => {
//         Object.entries(items.attributes).forEach(([key, value]) => {
//           // Si la clave es "Color", crea un array con el valor y la primera imagen
//           const attributeValue = key === "Color"
//             ? [value, items.images[0] || ""]
//             : [value];

//           // Si la clave aún no existe en el objeto, créala
//           if (!uniqueAttributes[key]) {
//             uniqueAttributes[key] = [];
//           }

//           if (!uniqueAttributes[key].flat().includes(attributeValue[0])) {
//             uniqueAttributes[key].push(attributeValue);
//           }
//         });
//       });

//       // listProducts.forEach((el) => {
//       //   el.variants.forEach(element => {
//       //     console.log(element.attributes)
//       //   })
//       // })

//       const selectProductStock = listProducts[0].variants.find(e => e.stock > 0)
//       const selectProductAllStock = listProducts[0].variants[0]
//       const selectedPrimaryAttribute = Object.values(selectProductStock?.attributes || selectProductAllStock.attributes)[0]


//       setStateProductDetail({
//         ...stateProductDetail,
//         images: {
//           parent: selectProductStock?.images[0] || selectProductAllStock.images[0],
//           children: selectProductStock?.images.slice(1) || selectProductAllStock.images.slice(1)
//         },
//         attributes: uniqueAttributes,
//         selectedAttribute: selectedPrimaryAttribute
//       });
//     }
//   }, [listProducts]);


//   if (listProducts.length === 0) return <div className="product-detail">Cargando...</div>;
//   const { product: { product, brand, description, specifications, benefits, warranty, contents } } = listProducts[0];

//   return (
//     <div className='product-detail'>
//       {listProducts.length > 0 && (
//         <div className="product-detail__container">

//           <div className="product-detail__breadcrumb">
//             {BreadcrumbComponent}
//           </div>

//           <div className='product-detail__content'>

//             <div className="product-detail__images">

//               <div className="product-detail__images-showcase">
//                 <div className='images-showcase__container'>

//                   <div className='images-showcase__parent'>
//                     <img width={"400px"} src={stateProductDetail.images.parent} alt="" />
//                   </div>

//                   <div className='images-showcase__children'>
//                     {stateProductDetail.images.children.map((img, index) => <img key={index} width={"100px"} src={img} alt='' />)}
//                   </div>

//                 </div>
//               </div>



//               {/* <div className="product-detail__thumbnail-images">
//                 {variants.map((e, variantIndex) => (
//                   <img
//                     width={"100px"}
//                     key={variantIndex}
//                     src={e.images[0]}
//                     alt=""
//                     onClick={() => setStateProductDetail(e.images[0])}
//                   />
//                 ))}
//               </div> */}
//             </div>

//             <div className='product-detail__detail'>

//               <div className="product-detail__title">
//                 <h2>{product}</h2>
//               </div>

//               <div className="product-detail__brand">
//                 <p>{brand}</p>
//               </div>

//               <div className="product-detail__price">
//                 {/* {variants.map((e, variantIndex) => (
//                   <div key={variantIndex}>
//                     <h3>{e.price}</h3>
//                   </div>
//                 ))} */}
//               </div>

//               <div className='product-detail__attributes'>

//                 {listProducts[0].variants.map(e => {
//                   return (
//                     <div key={e.variant_id}>
//                       <img src={e.images[0]} width={50} alt="" />
//                       {Object.values(e.attributes).map((attribute, index) => {
//                         return (
//                           <div key={index}>
//                             {attribute}
//                           </div>
//                         )
//                       })}
//                     </div>
//                   )
//                 })}
//               </div>

//               <div className="product-detail__benefits">
//                 {benefits.map((ben, index) => (
//                   <ul key={index}>
//                     <li>{ben}</li>
//                   </ul>
//                 ))}
//               </div>

//             </div>
//           </div>

//           <div className="product-detail__description">
//             <p>{description}</p>
//           </div>

//           <div className="product-detail__warranty">
//             <p>{warranty}</p>
//           </div>

//           <div className="product-detail__contents">
//             <p>{contents}</p>
//           </div>

//           <div className="product-detail__specification">
//             {Object.entries(specifications).map(([key, value], index) => (
//               <ul key={index}>
//                 <li>
//                   <span>{key}: </span>
//                   <span>{value}</span>
//                 </li>
//               </ul>
//             ))}
//           </div>



//           <div className="product-detail__showcase">
//             {/* {similarProducts.length > 0 && <Showcase title="Productos similares" cardData={similarProducts} />} */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductDetail;


{/* <div className="images" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
{variants.map(e => {
  return (
    <div>
      <h3>{e.price}</h3>
      {
        e.images.map((img, i) => (
          <div key={i}>
            <img src={img} alt="" width={100} />
          </div>
        ))
      }
      {
        Object.entries(e.attributes).map(([key, value], i) => (
          <div key={i}>
            <span><span>{key}</span>: <span>{value}</span></span>
          </div>
        ))
      }

    </div>
  )
})}
</div> */}