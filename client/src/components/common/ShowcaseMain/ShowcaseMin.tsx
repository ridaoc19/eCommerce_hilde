import { ReactNode, useEffect, useRef, useState } from "react";
import Svg from "../../assets/icons/Svg";
import './showcaseMin.scss';


function ShowcaseMin({ children }: { children: ReactNode[], isButton?: boolean }) {
  // function ShowcaseMin({ children }: { children: ReactNode, listProducts: ListProductHook['listProducts'], handleOnClick: (variant_id: Omit<IProduct.Variant, 'product'>) => {} }) {
  const [isOverflowed, setIsOverflowed] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      const contentDiv = containerRef.current;

      if (contentDiv) {
        console.log(contentDiv.scrollWidth > contentDiv.clientWidth)
        const overflow = contentDiv.scrollWidth > contentDiv.clientWidth;
        setIsOverflowed(overflow);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup the ResizeObserver on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="showcase-min">
      <div className="showcase-min__content" ref={containerRef} onScroll={onScrollHandler}>
        {children && children.map((item, index) => (
          <div key={index}>
            <div className={`showcase-min__card`}>
              {item}
            </div>
          </div>
        ))
        }

      </div>

      {isOverflowed &&
        <>
          <div className={`showcase-min__button--left-container`}>
            <button
              className={`showcase-min__button-left`}
              onClick={() => handleScroll('left')}
            >
              <Svg type="arrowLeft" color="white" width={10} />
            </button>
          </div>

          <div className={`showcase-min__button--right-container`}>
            <button
              className={`showcase-min__button--right`}
              onClick={() => handleScroll('right')}
            >
              <Svg type="arrowRight" color="white" width={10} />
            </button>
          </div>
        </>}
    </div>
  );
}

export default ShowcaseMin;