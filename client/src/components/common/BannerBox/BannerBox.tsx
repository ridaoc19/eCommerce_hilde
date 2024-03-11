import { Link } from "react-router-dom";
import { ParamsChildren } from "../../../hooks/useAdvertising/useAdvertising";
import InputAdvertising from "../FromAdvertising/FormAdvertising";
import useMediaQuery from "../../../hooks/useMediaQuery";

// interface BannerBoxProps {
//   advertising: IContextData['advertising']['advertisingContextState'],
//   location: IAdvertising.TotalLocation
// }

function BannerBox({ advertising, location, isFetching, isLoading }: ParamsChildren) {
  const { mediaQuery } = useMediaQuery()
  // const advertisingData = { ...advertising.advertisingData, data: advertising.advertisingData.data.filter(e => e.location === location) }
  // const { isFetching, isLoading, data } = advertisingData;
  // if (advertising.length === 0) return null
  return (
    <>
      <div className="banner-box">
        {isFetching || isLoading ? <div>Cargando...</div> : advertising.length > 0 && advertising.map(item => {
          return (
            <Link key={item.advertising_id} to={item.redirect} className={`banner-box__item ${mediaQuery}`}>
              <img src={item.image_desktop} alt="" />
              <h3>{item.title}</h3>
            </Link>
          )
        })}
      </div>
      <InputAdvertising advertising={advertising} isFetching={isFetching} isLoading={isLoading} location={location} title={location} />
    </>

  );
}

export default BannerBox;