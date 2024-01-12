import { Link } from "react-router-dom";
import { IContextData } from "../useContext";

function Banner({ advertisingData }: IContextData['advertising']['advertisingContextState']) {
  const { isFetching, isLoading, data } = advertisingData;
  return (
    <div className="banner" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around' }}>
      {isFetching || isLoading ? <div>Cargando...</div> : data.map(item => {
        return (
          <Link key={item.advertising_id} to={item.redirect}>
            <img src={item.image_desktop} alt="" style={{ borderRadius: '0.5rem', width: '100%' }} />
          </Link>
        )
      })}
    </div>
  );
}

export default Banner;