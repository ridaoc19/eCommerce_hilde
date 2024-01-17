import { Link } from "react-router-dom";
import { IContextData } from "../../../hooks/useContext";

function Banner({ advertisingData }: IContextData['advertising']['advertisingContextState']) {
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
    </div>
  );
}

export default Banner;