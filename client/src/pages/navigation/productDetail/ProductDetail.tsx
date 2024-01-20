import { useEffect, useState } from 'react';
import useListProduct from "../../../hooks/useListProduct/useListProduct";
import { validateRouteImage } from '../../../components/utils/validateRouteImage';

interface SelectImage {
  images: {
    parent: string;
    children: string[];
  }
  attributes: Record<string, Array<string[]>>
}


function ProductDetail() {
  const { BreadcrumbComponent, listProducts } = useListProduct();
  const [selectedImage, setSelectedImage] = useState<SelectImage>({ images: { parent: "", children: [] }, attributes: { key: [[]] } });

  useEffect(() => {
    if (listProducts.length > 0) {

      // Objeto para almacenar la relación entre todas las claves y sus valores únicos
      const uniqueAttributes: Record<string, Array<string[]>> = {};

      listProducts[0].variants.forEach(items => {
        Object.entries(items.attributes).forEach(([key, value]) => {
          // Si la clave es "Color", crea un array con el valor y la primera imagen
          const attributeValue = key === "Color"
            ? [value, items.images[0] || ""]
            : [value];

          // Si la clave aún no existe en el objeto, créala
          if (!uniqueAttributes[key]) {
            uniqueAttributes[key] = [];
          }

          if (!uniqueAttributes[key].flat().includes(attributeValue[0])) {
            uniqueAttributes[key].push(attributeValue);
          }
        });
      });

      listProducts.forEach((el) => {
        el.variants.forEach(element => {
          console.log(element.attributes)
        })
      })
      // Imprimir el resultado
      // console.log(uniqueAttributes);

      setSelectedImage({
        images: {
          parent: listProducts[0].variants[0].images[0],
          children: listProducts[0].variants[0].images.slice(1)
        },
        attributes: uniqueAttributes
      });
    }
  }, [listProducts]);


  if (listProducts.length === 0) return <div className="product-detail">Cargando...</div>;
  const { product: { product, brand, description, specifications, benefits, warranty, contents } } = listProducts[0];

  return (
    <div className='product-detail'>
      {listProducts.length > 0 && (
        <div className="product-detail__container">

          <div className="product-detail__breadcrumb">
            {BreadcrumbComponent}
          </div>

          <div className='product-detail__content'>

            <div className="product-detail__images">

              <div className="product-detail__images-showcase">
                <div className='images-showcase__container'>

                  <div className='images-showcase__parent'>
                    <img width={"400px"} src={selectedImage.images.parent} alt="" />
                  </div>

                  <div className='images-showcase__children'>
                    {selectedImage.images.children.map((img, index) => <img key={index} width={"100px"} src={img} alt='' />)}
                  </div>

                </div>
              </div>



              {/* <div className="product-detail__thumbnail-images">
                {variants.map((e, variantIndex) => (
                  <img
                    width={"100px"}
                    key={variantIndex}
                    src={e.images[0]}
                    alt=""
                    onClick={() => setSelectedImage(e.images[0])}
                  />
                ))}
              </div> */}
            </div>

            <div className='product-detail__detail'>

              <div className="product-detail__title">
                <h2>{product}</h2>
              </div>

              <div className="product-detail__brand">
                <p>{brand}</p>
              </div>

              <div className="product-detail__price">
                {/* {variants.map((e, variantIndex) => (
                  <div key={variantIndex}>
                    <h3>{e.price}</h3>
                  </div>
                ))} */}
              </div>

              <div className='product-detail__attributes'>
                {Object.values(selectedImage.attributes).map((item) => {
                  return <div key={Math.floor(Math.random() * (0 - 3000 + 1)) + 3000} className='family'>
                    {
                      item.map((attribute) => {
                        return <div key={Math.floor(Math.random() * (0 - 3000 + 1)) + 3000} className='parent'>
                          {attribute.map((attributeIn, index) => {
                            return (
                              <div key={index} className='children'>
                                {validateRouteImage(attributeIn)
                                  ? <img width={50} src={attributeIn} alt="" />
                                  : <h3>{attributeIn}</h3>
                                }
                              </div>
                            )
                          })}
                        </div>
                      })
                    }
                  </div>
                })}
                {/* {variants.map(e => {
                  return Object.entries(e.attributes).map(([key, value], i) => (
                    <div key={i}>
                      <span><span>{key}</span>: <span>{value}</span></span>
                    </div>
                  ))
                })} */}

              </div>

              <div className="product-detail__benefits">
                {benefits.map((ben, index) => (
                  <ul key={index}>
                    <li>{ben}</li>
                  </ul>
                ))}
              </div>

            </div>
          </div>

          <div className="product-detail__description">
            <p>{description}</p>
          </div>

          <div className="product-detail__warranty">
            <p>{warranty}</p>
          </div>

          <div className="product-detail__contents">
            <p>{contents}</p>
          </div>

          <div className="product-detail__specification">
            {Object.entries(specifications).map(([key, value], index) => (
              <ul key={index}>
                <li>
                  <span>{key}: </span>
                  <span>{value}</span>
                </li>
              </ul>
            ))}
          </div>



          <div className="product-detail__showcase">
            {/* {similarProducts.length > 0 && <Showcase title="Productos similares" cardData={similarProducts} />} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;


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