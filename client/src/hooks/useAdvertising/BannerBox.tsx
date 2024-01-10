import { IContextData } from "../useContext";

function BannerBox({ advertisingData }: IContextData['advertising']['advertisingContextState']) {
  const { isFetching, isLoading, data } = advertisingData;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around' }}>
      {isFetching || isLoading ? <div>Cargando...</div> : data.map(item => {
        if (item.location !== 'banner-box') return null
        return (
          <div key={item.advertising_id}>
            <img src={item.image_desktop} alt="" style={{ borderRadius: '0.5rem' }} />
            <h3>{item.title}</h3>
          </div>
        )
      })}
    </div>
  );
}

export default BannerBox;