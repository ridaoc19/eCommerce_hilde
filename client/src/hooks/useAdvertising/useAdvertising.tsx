import { ReactNode, useContext } from "react";
import { CreateContext } from "../useContext";
import BannerBox from "./BannerBox";
import Carrusel from "../../components/common/carrusel/Carrusel";

interface UseAdvertising {
  BannerBox: ReactNode;
  // Showcase: ReactNode;
  Carrusel: ReactNode;
}


function useAdvertising(): UseAdvertising {
  const { advertising: { advertisingContextState: { advertisingData } } } = useContext(CreateContext)!

  return {
    BannerBox: <BannerBox advertisingData={advertisingData} />,
    Carrusel: <Carrusel advertising={advertisingData.data.filter(e => e.location === 'carrusel')}  />
  };
}

export default useAdvertising;