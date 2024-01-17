import { Link } from 'react-router-dom';
import { IProduct } from '../../../interfaces/product.interface';
import Button from '../button/Button';

export type CardProps = Pick<IProduct.Product, 'product_id' | 'product' | 'brand'> & { price: number[], images: string[] }

function Card({ product_id, images, price, product, brand }: CardProps) {
  const uniqueVariants = [...new Set(price)];
  const minValue = Math.min(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });
  const maxValue = Math.max(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });

  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  return (
    <Link to={`/product-detail/${product_id}`} className="global__card-container" >

      <div className='global__card-content'>

        <div className="card__images">
          {urlRegex.test(images[0])
            ? <img src={images[0]} alt="" />
            : <img src={`${process.env.REACT_APP_SERVER_FILE}/${images[0]}`} alt="" />}
        </div>
        <div className="card__content">
          <p>{brand}</p>
          {/* <OverflowDetectionComponent product={product}> */}
          <h4 >{product}</h4>
          {/* </OverflowDetectionComponent> */}
          <h4>{uniqueVariants.length === 0 ? 'Agotado' : uniqueVariants.length > 1 ? `${minValue} - ${maxValue}` : minValue}</h4>
        </div>

        <div className="card__button">
          <Button button={{
            type: 'dark',
            text: 'Agregar',
            handleClick: () => { }
          }} />
        </div>

      </div>
    </Link>
  );
}

export default Card;