import { Link } from "react-router-dom";
import { IProduct } from "../../../interfaces/product.interface";
import { validateRouteImage } from "../../utils/validateRouteImage";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { BreadcrumbType } from "../../../interfaces/global.interface";
import Button from "../button/Button";

interface SearchCardProps {
  listProduct: IProduct.ListProduct;
  handleOnClick: () => void
}

function SearchCard({ listProduct, handleOnClick }: SearchCardProps) {
  const { product, variants, department, category, subcategory } = listProduct;
  const uniqueVariants = [...new Set(variants.map(e => e.price))];
  const minValue = Math.min(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });
  const maxValue = Math.max(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });

  const image: string = variants.length > 0 ? variants[0].images[0] : '';

  return (
    <Link to={`/product-detail/${product.product_id}`} onClick={handleOnClick} className="search__card-content">
      <div className="card__breadcrumb">
        <Breadcrumb viewHome={false} breadcrumb={{
          entity: BreadcrumbType.Product,
          data: [
            { _id: department.department_id, name: department.department, name_id: 'department' },
            { _id: category.category_id, name: category.category, name_id: 'category' },
            { _id: subcategory.subcategory_id, name: subcategory.subcategory, name_id: 'subcategory' },
            { _id: product.product_id, name: product.product, name_id: 'product' },
          ]
        }}
        />
      </div>
      <div className="card__main">
        <div className="card__images">
          <img src={validateRouteImage(image) ? image : `${process.env.REACT_APP_SERVER_FILE}/${image}`} alt="" />
        </div>
        <div className="card__content">
          <div className="card__title" >
            <h3>{product.product}</h3>
          </div>
          <div className="card__utils">
            <div className="card__utils-price">
              <h4>{uniqueVariants.length > 1 ? `${minValue} - ${maxValue}` : minValue}</h4>
            </div>
            <div className="card__utils-button">
              <Button button={{ type: "dark", text: 'Agregar', handleClick: () => { } }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;