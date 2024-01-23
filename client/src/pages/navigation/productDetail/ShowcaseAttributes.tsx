import { ReactNode, useRef } from "react";
import Svg from "../../../components/assets/icons/Svg";


function ShowcaseAttributes({ children }: { children: ReactNode}) {
  // function ShowcaseAttributes({ children }: { children: ReactNode, listProducts: ListProductHook['listProducts'], handleOnClick: (variant_id: Omit<IProduct.Variant, 'product'>) => {} }) {
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
        {children}
      </div>

      <div className={`product-detail__attributes-button--left-container`}>
        <button
          className={`product-detail__attributes-button-left`}
          onClick={() => handleScroll('left')}
        >
          <Svg type="arrowLeft" color="white" width={10} />
        </button>
      </div>

      <div className={`product-detail__attributes-button--right-container`}>
        <button
          className={`product-detail__attributes-button--right`}
          onClick={() => handleScroll('right')}
        >
          <Svg type="arrowRight" color="white" width={10} />
        </button>
      </div>
    </>
  );
}

export default ShowcaseAttributes;