import { useRef } from "react";
import Svg from "../../../components/assets/icons/Svg";
import { ListProductHook } from "../../../hooks/useListProduct/types";
import { IProduct } from "../../../interfaces/product.interface";


function ShowcaseAttributes({ listProducts, handleOnClick }: { listProducts: ListProductHook['listProducts'], handleOnClick: (variant_id: Omit<IProduct.Variant, 'product'>) => {} }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onScrollHandler = () => {
    console.log("scroll")
  }

  const handleScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 300;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <>
      <div className="product-detail__attributes-content" ref={containerRef} onScroll={onScrollHandler}>
        {listProducts[0].variants.sort((a, b) => b.price - a.price).map(e => {
          return (
            <div key={e.variant_id}>
              <button disabled={e.price === 0} className={`product-detail__attributes-card ${e.price === 0 ? 'disabled' : ''}`} onClick={() => handleOnClick(e)}>
                {e.price === 0 && <span className="no-stock">AGOTADO</span>}
                <img src={e.images[0]} width={60} alt="" />
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


      </div>

      <div className={`product-detail__attributes-button--left-container`}>
        <button
          className={`product-detail__attributes-button-left`}
          onClick={() => handleScroll('left')}
        >
          <Svg type="arrowLeft" color="white" />
        </button>
      </div>

      <div className={`product-detail__attributes-button--right-container`}>
        <button
          className={`product-detail__attributes-button--right`}
          onClick={() => handleScroll('right')}
        >
          <Svg type="arrowRight" color="white" />
        </button>
      </div>
    </>
  );
}

export default ShowcaseAttributes;