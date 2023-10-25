import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import Card from "../../../components/common/card/Card";
import useProductFilter from "../../../hooks/useProductFilter";
import './listProducts.scss';

function ListProducts() {
  const { id } = useParams();
  const [productId, setProductId] = useState(id || "")
  const { findItemById } = useProductFilter();
  const { product } = useMemo(() => findItemById({ id: productId }), [productId])

  useEffect(() => {
    setProductId(id || "")
  }, [id])

  return (
    <div className="list-product__container">
      <div className="list-product__breadcrumb">
        <Breadcrumb />
      </div>
      <div className="list-product__card">
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