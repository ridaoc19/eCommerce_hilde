import { useEffect, useState } from "react";
import useProductFilter from "../../hooks/useProductFilter";
import { IProduct } from "../../interfaces/product.interface";
import App from "./principal";
// import './card.scss';

function Home() {
  const { findItemById, isFetching, isLoadingProduct } = useProductFilter();
  const [department, setDepartment] = useState<IProduct.Department[]>([])

  useEffect(() => {
    if (!isLoadingProduct) {
      setDepartment(findItemById({ id: "" }).department.data)
    }
    // eslint-disable-next-line
  }, [isLoadingProduct, isFetching])
  if (false) {
    console.log(department, "no");
  }
  return (
    <>
      {isLoadingProduct ? <div>Cargando productos</div> :
        <>
          <App products={department.flatMap(e => e.categoriesId).flatMap(e => e.subcategoriesId).flatMap(e => e.productsId)} />
          {/* {department.map(({ _id, categoriesId, department }) => {
            const product = categoriesId.flatMap(e => e.subcategoriesId).flatMap(e => e.productsId)
            const cardData = product.map(({ _id, images, variants, brand, product }) => {
              return {
                _id,
                images,
                price: variants.map(e => e.sellingPrice),
                product,
                brand
              }
            })
            return <Showcase key={_id} title={department} cardData={cardData} />
          })} */}
        </>
      }
    </>
  );
}

export default Home;
