import useMediaQuery from "../../../hooks/useMediaQuery";
import useProductDetail from "./useProductDetail";


function ProductDetail() {
  const { mediaQuery } = useMediaQuery();
  const { components } = useProductDetail()

  return (
    <div className={`product-detail ${mediaQuery}`}>

      <div className="product-detail__breadcrumb">
        {components.BreadcrumbComponent}
      </div>

      <div className="product-detail__images--content">

        <div className={`images-content ${mediaQuery}`}>
          {components.Images}
          {components.Content}
        </div>
      </div>

      <div className="product-detail__other">
        {components.Other}
      </div>
    </div>
  );
}

export default ProductDetail;
