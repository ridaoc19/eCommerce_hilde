import { Link } from "react-router-dom";
import InputAdvertising from "../../../hooks/useAdvertising/InputAdvertising";
import { IContextData } from "../../../hooks/useContext";
import { IAdvertising } from "../../../interfaces/advertising.interface";

interface BannerProps {
  advertising: IContextData['advertising']['advertisingContextState'],
  location: IAdvertising.TotalLocation
}

function Banner({ advertising, location }: BannerProps) {
  const advertisingData = { ...advertising.advertisingData, data: advertising.advertisingData.data.filter(e => e.location === location) }
  const { isFetching, isLoading, data } = advertisingData;
  if (advertisingData.data.length === 0) return null

  return (
    <div className={`${advertisingData?.data[0]?.location || 'banner'} banner`}>
      {isFetching || isLoading ? <div>Cargando...</div> : data.map(item => {
        return (
          <Link key={item.advertising_id} to={item.redirect}>
            <img src={item.image_desktop} alt="" />
          </Link>
        )
      })}
      <InputAdvertising advertising={{advertisingData}} location={location} />
    </div>
  );
}

export default Banner;