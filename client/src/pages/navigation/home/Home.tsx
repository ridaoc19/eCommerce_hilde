import useAdvertising from "../../../hooks/useAdvertising/useAdvertising";

function Home() {
  const {CarruselMultiple, BannerBox, Carrusel, BannerPrimary, BannerSecondary } = useAdvertising()

  return (
    <div>
      {Carrusel}
      {CarruselMultiple}
      {BannerPrimary}
      <hr />
      {BannerBox}

      {BannerSecondary}
    </div>
  );
}

export default Home;