import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import useProductFilter from "../../../hooks/useProductFilter";

function ProductDetail() {
  const { id } = useParams();
  const { findItemById } = useProductFilter();
  const { product } = useMemo(() => findItemById({ id: id || "" }), [findItemById])

  return (
    <div>
      <div className="detail__breadcrumb">
        <Breadcrumb />
      </div>
      <div>
        <h2>{product.product}</h2>
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