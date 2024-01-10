import useAdvertising from "../../../hooks/useAdvertising/useAdvertising";

function Home() {
  const { BannerBox, Carrusel, BannerPrimary, BannerSecondary } = useAdvertising()


  // const { advertising: { advertisingContextState } } = useContext(CreateContext)!
  // const { advertisingData: { data, isLoading, isFetching } } = advertisingContextState;
  return (
    <div>
      {Carrusel}
      {BannerPrimary}
      <hr />
      {BannerBox}
      {/* {isLoading || isFetching ? <div>Cargando...</div> :
        data.map(e => {
          if (e.page !== 'home') return

          if (e.location === 'banner-primary') {
            return (
              <div key={e.advertising_id}>
                <img src={e.image_desktop} alt="" />
                <img src={e.image_tablet} alt="" />
                <img src={e.image_phone} alt="" />
              </div>
            )
          } else if (e.location === 'banner-box') {
            return (
              <div key={e.advertising_id}>
                <img src={e.image_desktop} alt="" />
                <img src={e.image_tablet} alt="" />
                <img src={e.image_phone} alt="" />
              </div>
            )
          } else if (e.location === 'banner-secondary') {
            return (
              <div key={e.advertising_id}>
                <img src={e.image_desktop} alt="" />
                <img src={e.image_tablet} alt="" />
                <img src={e.image_phone} alt="" />
              </div>
            )
          } else {
            return (
              <div key={e.advertising_id}>
                <img src={e.image_desktop} alt="" />
                <img src={e.image_tablet} alt="" />
                <img src={e.image_phone} alt="" />
              </div>
            )
          }
        })
      } */}
      {BannerSecondary}
    </div>
  );
}

export default Home;