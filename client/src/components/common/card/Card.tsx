import './card.scss'

export interface CardProps {
  images: string,
  price: number[],
  name: string,
  brand: string
}

function Card({ images, price, name, brand }: CardProps) {
  const uniqueVariants = [...new Set(price)];
  const minValue = Math.min(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });
  const maxValue = Math.max(...uniqueVariants).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, });

  return (
    <div className="global__card-container">

      <div className="card__images">
        <img src={`${process.env.REACT_APP_SERVER_FILE}/${images}`} alt="" />
      </div>
      <div className="card__content">
        <h4>{uniqueVariants.length > 1 ? `${minValue} - ${maxValue}` : minValue}</h4>
        <h4>{name}</h4>
        <p>{brand}</p>
      </div>

      <div className="card__button">
        <button className="button_dark">Agregar</button>
      </div>
    </div>
  );
}

export default Card;