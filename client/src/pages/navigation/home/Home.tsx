import useAdvertising from "../../../hooks/useAdvertising/useAdvertising";

function Home() {
  const { CarruselMultiple, BannerBox, Carrusel, BannerPrimary, BannerSecondary, ShowcaseProductView } = useAdvertising()

  return (
    <div className="home">
      {Carrusel}
      {BannerPrimary}
      {BannerBox}
      {ShowcaseProductView}
      {BannerSecondary}
      {CarruselMultiple}
    </div>
  );
}

export default Home;