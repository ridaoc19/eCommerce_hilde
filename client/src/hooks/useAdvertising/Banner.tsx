import { IContextData } from "../useContext";

function Banner({ advertisingData }: IContextData['advertising']['advertisingContextState']) {
  const { isFetching, isLoading, data } = advertisingData;
  console.log(advertisingData)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around' }}>
      {isFetching || isLoading ? <div>Cargando...</div> : data.map(item => {
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

export default Banner;