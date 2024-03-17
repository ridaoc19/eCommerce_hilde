import ShowcaseMin from "../../../../components/common/ShowcaseMain/ShowcaseMin";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import { IProduct } from "../../../../interfaces/product.interface";
import { UseProductDetail } from "../useProductDetail";

interface ContentProps {
  listProductsData: UseProductDetail['data'];
  handleClick: (variant: Omit<IProduct.Variant, 'product'>) => void;
  stateProductDetail: UseProductDetail['react']['stateProductDetail'];
}

function Content({ handleClick, stateProductDetail, listProductsData: { listProducts } }: ContentProps) {
  const { mediaQuery } = useMediaQuery();

  if (listProducts.length === 0 || !stateProductDetail.selectedVariant) return null
  const { product: { product, brand, benefits } } = listProducts[0];

  return (
    <div className={`content ${mediaQuery}`}>

      <div className='content__attributes'>
        <ShowcaseMin>
          {listProducts[0].variants.sort((a, b) => b.price - a.price).map(e => {
            return (
              <div key={e.variant_id}>
                <button disabled={e.price === 0} className={`content__attributes-card ${e.price === 0 ? 'disabled' : ''}`} onClick={() => handleClick(e)}>
                  {e.price === 0 && <span className="no-stock">AGOTADO</span>}
                  <div className="content__attributes-card-image">
                    <img src={e.images[0]} alt="" />
                  </div>
                  {Object.values(e.attributes).map((attribute, index) => {
                    return (
                      <div key={index}>
                        <p>{attribute}</p>
                      </div>
                    )
                  })}
                </button>
              </div>
            )
          })}
        </ShowcaseMin>
      </div>

      <div className="content__id">
        <h6>ID: {stateProductDetail.selectedVariant.variant_id.replace(/-/g, '').toUpperCase()}</h6>
      </div>

      <div className="content__title">
        <h2>{product}</h2>
      </div>

      <div className="content__brand">
        <h3>Marca:</h3> <p>{brand}</p>
      </div>

      <div className="content__price">
        <h3>{stateProductDetail.selectedVariant.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0, })}</h3>
      </div>

      <div className="content__benefits">
        {benefits.length > 0 && <h3>Acerca de este producto</h3>}
        {benefits.map((ben, index) => (
          <ul key={index}>
            <li>{ben}</li>
          </ul>
        ))}
      </div>

    </div>
  );
}

export default Content;