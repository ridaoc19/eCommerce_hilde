import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
import useProductFilter from "../../../hooks/useProductFilter";
import Showcase from "../../../components/common/showcase/Showcase";

function ProductDetail() {
  const { id } = useParams();
  const { findItemById } = useProductFilter();
  const { product } = useMemo(() => findItemById({ id: id || "" }), [findItemById])
  const similar = findItemById({ id: product.subcategoryId || "" }).product.data.filter(e => e._id !== product._id)
  const similarProducts = similar.map(({ _id, images, variants, brand, product }) => {
    return {
      _id,
      images,
      price: variants.map(e => e.sellingPrice),
      product,
      brand
    }
  })


  const uniqueVariants = [...new Set(product.variants.map(e => e.sellingPrice))];
  const minValue = Math.min(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });
  const maxValue = Math.max(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });

  console.log()
  return (
    <div>
      <div className="detail__breadcrumb">
        <Breadcrumb />
      </div>
      <div>
        <div className="title">
          <h2>{product.product}</h2>
        </div>
        <div className="marca">
          <p>{product.brand}</p>
        </div>
        <div className="images">
          {product.images.map((image, index) => <img key={index} src={`${process.env.REACT_APP_SERVER_FILE}/${image}`} alt={index.toString()} width={'200'} />)}
        </div>
        <div className="price">
          <h4>{uniqueVariants.length === 0 ? 'Agotado' : uniqueVariants.length > 1 ? `${minValue} - ${maxValue}` : minValue}</h4>
        </div>
        <div className="description">
          <p>{product.description}</p>
        </div>
        <div className="specification">
          {product.specification.map((item, index) => {
            return (
              <div key={index}><span>{item.key}: </span><span>{item.value}</span></div>
            )
          })}
        </div>
        <div className="showcase">
          {similarProducts.length > 0 && <Showcase title="Productos similares" cardData={similarProducts} />}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;