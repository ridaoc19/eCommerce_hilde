import { useEffect, useState } from "react";
import Showcase from "../../components/common/showcase/Showcase";
import useProductFilter from "../../hooks/useProductFilter";
import { IProduct } from "../../interfaces/product.interface";
// import './card.scss';

function Home() {
  const { findItemById, isFetching } = useProductFilter();
  const [department, setDepartment] = useState<IProduct.Department[]>([])

  useEffect(() => {
    if (!isFetching) {
      setDepartment(findItemById({ id: "" }).department.data)

    }
    // eslint-disable-next-line
  }, [isFetching])
  return (
    <>
      {isFetching ? <div>Cargando productos</div> :
        <>
          {department.map(({ _id, name, categoriesId }) => {
            const product = categoriesId.flatMap(e => e.subcategoriesId).flatMap(e => e.productsId)
            const cardData = product.map(({ _id, images, variants, name, brand }) => {
              return {
                _id,
                images: images[0],
                price: variants.map(e => e.sellingPrice),
                name,
                brand
              }
            })
            return <Showcase key={_id} title={name} cardData={cardData} />
          })}
        </>
      }
    </>
  );
}

export default Home;
