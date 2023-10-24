import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import useProductFilter from "../../../hooks/useProductFilter";

function ProductDetail() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [productId, setProductId] = useState(id || "")
  const { findItemById } = useProductFilter();
  const resultProduct = useMemo(() => findItemById({ id: productId }), [findItemById])
  const { type, breadcrumb, product } = resultProduct;

  useEffect(() => {
    setProductId(id || "")
  }, [id])

  useEffect(() => {
    // console.log(resultProduct);
    if (type !== 'product') navigator(`/list-products/${productId}`)
  }, [type])
  return (
    <div>
      <div className="detail__breadcrumb">
        <Breadcrumb breadcrumb={breadcrumb} handleClickBreadcrumb={(_id) => setProductId(_id)} />
      </div>
      <div>
        <h2>{product.name}</h2>
        <p>{product.brand}</p>
        <div>
          {product.images.map((image, index) => <img key={index} src={`${process.env.REACT_APP_SERVER_FILE}/${image}`} alt={index.toString()} width={'200'} />)}
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetail;