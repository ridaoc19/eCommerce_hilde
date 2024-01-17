import { Link } from "react-router-dom";
import { IContextData } from "../../../hooks/useContext";

function BannerBox({ advertisingData }: IContextData['advertising']['advertisingContextState']) {
  const { isFetching, isLoading, data } = advertisingData;
  if (advertisingData.data.length === 0) return null
  return (
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
  );
}

export default BannerBox;