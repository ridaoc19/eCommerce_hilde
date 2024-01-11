import useAdvertising from "../../../hooks/useAdvertising/useAdvertising";

function Home() {
  const {CarruselMultiple, BannerBox, Carrusel, BannerPrimary, BannerSecondary } = useAdvertising()

  return (
    <div>
      {Carrusel}
      {BannerPrimary}
      <hr />
      {BannerBox}

      {BannerSecondary}
      {CarruselMultiple}
    </div>
  );
}

export default Home;