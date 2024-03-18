import ShowcaseMin from "../../../../components/common/ShowcaseMain/ShowcaseMin";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import { InitialStateProductDetail } from "../useProductDetail";

interface ImagesProps {
  handleClick: (currentImage: number) => void;
  stateProductDetail: InitialStateProductDetail;
}

function Images({ handleClick, stateProductDetail: { selectedVariant, currentImage } }: ImagesProps) {
  const { mediaQuery } = useMediaQuery();
  if (!selectedVariant) return null

  return (
    <div className={`images ${mediaQuery}`}>
      <div className={`images__parent ${mediaQuery}`}>
        <img src={selectedVariant.images[currentImage]} alt="" />
      </div>

      <div className='images__children'>
        <ShowcaseMin>
          {selectedVariant.images.map((e, index) => {
            return (
              <button key={index} className="images__children-button" onClick={() => handleClick(index)}>
                <img src={e} alt="" />
              </button>
            )
          })}
        </ShowcaseMin>
      </div>
    </div>

  );
}

export default Images;