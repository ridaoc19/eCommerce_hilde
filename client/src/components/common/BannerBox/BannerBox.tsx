import { Link } from "react-router-dom";
import InputAdvertising from "../FromAdvertising/FormAdvertising";
import { IContextData } from "../../../hooks/useContext";
import { IAdvertising } from "../../../interfaces/advertising.interface";

interface BannerBoxProps {
  advertising: IContextData['advertising']['advertisingContextState'],
  location: IAdvertising.TotalLocation
}

function BannerBox({ advertising, location }: BannerBoxProps) {
  const advertisingData = { ...advertising.advertisingData, data: advertising.advertisingData.data.filter(e => e.location === location) }
  const { isFetching, isLoading, data } = advertisingData;
  if (advertisingData.data.length === 0) return null
  return (
    <>
      <div className="banner-box">
        {isFetching || isLoading ? <div>Cargando...</div> : data.map(item => {
          return (
            <Link key={item.advertising_id} to={item.redirect} className="banner-box__item">
              <img src={item.image_desktop} alt="" />
              <h3>{item.title}</h3>
            </Link>
          )
        })}
      </div>
      <InputAdvertising advertising={{advertisingData}} location={location} />
    </>

  );
}

export default BannerBox;