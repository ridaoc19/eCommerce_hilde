import { useParams } from "react-router-dom";
import useProductFilter from "../../../hooks/useProductFilter";
import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import Card from "../../../components/common/card/Card";

function ListProducts() {
  const { id } = useParams();
  const [productId, setProductId] = useState(id || "")
  const { findItemById } = useProductFilter();
  const { breadcrumb, product } = useMemo(() => findItemById({ id: productId }), [findItemById])
  useEffect(() => {
    setProductId(id || "")
  }, [id])
  return (
    <div>
      <div>
        <Breadcrumb breadcrumb={breadcrumb} handleClickBreadcrumb={(_id) => setProductId(_id)} />
      </div>
      <div>
        {product.data.map(({ _id, name, brand, images, variants }) => {
          return (
            <Card key={_id} _id={_id} name={name} brand={brand} images={images[0]} price={variants.map(pri => pri.sellingPrice)} />
          )
        })}
      </div>
    </div>
  );
}

export default ListProducts;