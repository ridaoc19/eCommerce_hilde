import useAdvertising from "../../../hooks/useAdvertising/useAdvertising";

function Home() {
  const { CarruselMultiple, BannerBox, Carrusel, BannerPrimary, BannerSecondary } = useAdvertising()

  return (
    <div className="home">
      {Carrusel}
      {BannerPrimary}
      {BannerBox}
      {BannerSecondary}
      {CarruselMultiple}
    </div>
  );
}

export default Home;