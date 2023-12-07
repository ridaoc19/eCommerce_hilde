import { Link } from 'react-router-dom';
import { IProduct } from '../../../interfaces/product.interface';
import './card.scss';

// export interface CardProps {
//   _id: string,
//   images: string,
//   price: number[],
//   name: string,
//   brand: string
// }
export type CardProps = Pick<IProduct.Product, '_id' | 'product' | 'brand'> & { price: number[], images: string[] }

function Card({ _id, images, price, product, brand }: CardProps) {
  const uniqueVariants = [...new Set(price)];
  const minValue = Math.min(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });
  const maxValue = Math.max(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });

  return (
    <Link to={`/product-detail/${_id}`} className="global__card-container" style={{ textDecoration: 'none', color: 'none' }}>

      <div className="card__images">
        <img src={`${process.env.REACT_APP_SERVER_FILE}/${images[0]}`} alt="" />
      </div>
      <div className="card__content">
        <p>{brand}</p>
        <h4>{product}</h4>
        <h4>{uniqueVariants.length === 0 ? 'Agotado' : uniqueVariants.length > 1 ? `${minValue} - ${maxValue}` : minValue}</h4>
      </div>

      <div className="card__button">
        <button className="button_dark">Agregar</button>
      </div>
    </Link>
  );
}

export default Card;