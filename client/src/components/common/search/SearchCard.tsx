import { Link } from "react-router-dom";
import { IProduct } from "../../../interfaces/product.interface";

function SearchCard({ _id, name, variants, images, handleOnClick }:
  Pick<IProduct.Product, '_id' | 'name' | 'variants' | 'images'> & { handleOnClick: () => void }) {
  const uniqueVariants = [...new Set(variants.map(e => e.sellingPrice))];
  const minValue = Math.min(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });
  const maxValue = Math.max(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });

  return (
    <Link to={`/product-detail/${_id}`} onClick={handleOnClick} className="search__card-content">
      <div className="card__images">
        <img src={`${process.env.REACT_APP_SERVER_FILE}/${images[0]}`} alt="" />
      </div>
      <div className="card__content">
        <div className="card__title">
          <h4>{name}</h4>
        </div>
        <div className="card__utils">
          <h5>{uniqueVariants.length > 1 ? `${minValue} - ${maxValue}` : minValue}</h5>
          <button className="button_dark">Agregar</button>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;