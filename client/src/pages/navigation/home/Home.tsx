import useAdvertising from "../../../hooks/useAdvertising/useAdvertising";
import useMediaQuery from "../../../hooks/useMediaQuery";

function Home() {
  const { mediaQuery } = useMediaQuery();
  const { CarruselMultiple, BannerBox, Carrusel, BannerPrimary, BannerSecondary, ShowcaseProductView } = useAdvertising()

  return (
    <div className={`home ${mediaQuery}`}>
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