import { UseProductDetail } from "../useProductDetail";

interface OtherProps {
  listProductsData: UseProductDetail['data']
  // handleClick: (variant: Omit<IProduct.Variant, 'product'>) => void
  // stateProductDetail: UseProductDetail['react']['stateProductDetail']
}



function Other({ listProductsData: { listProducts } }: OtherProps) {
  if (listProducts.length === 0) return null
  const { description, warranty, contents, product, specifications } = listProducts[0].product;
  return (
    <div className="other">
      <div className="other__description">
        {description && <h3>Descripción del producto</h3>}
        <p>{description}</p>
      </div>

      <div className="other__warranty">
        {warranty && <h3>Garantía</h3>}
        <p>{warranty}</p>
      </div>

      <div className="other__contents">
        {contents && <h3>Contenido de la caja</h3>}
        <p>{contents}</p>
      </div>

      <div className="other__specification">
        <h2>Especificaciones</h2>
        <h4>{product}</h4>
        <div className="other__specification-columns">
          {Object.entries(specifications).map(([key, value], index) => (
            <ul key={index}>
              <li>
                <h5>{key}</h5>
                <span>{value}</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Other;