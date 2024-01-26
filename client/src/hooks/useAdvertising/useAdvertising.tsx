import { ReactNode, useContext } from 'react';
import { CreateContext } from '../useContext';
import Carrusel from '../../components/common/carrusel/Carrusel';
import Banner from '../../components/common/Banner/Banner';
import BannerBox from '../../components/common/BannerBox/BannerBox';
import { IAdvertising } from '../../interfaces/advertising.interface';

interface UseAdvertising {
  BannerBox: ReactNode;
  Carrusel: ReactNode;
  BannerPrimary: ReactNode;
  BannerSecondary: ReactNode;
  CarruselMultiple: ReactNode;
}

function useAdvertising(): UseAdvertising {
  const { advertising: { advertisingContextState: { advertisingData } } } = useContext(CreateContext)!;

  return {
    BannerBox: <BannerBox advertising={{ advertisingData }} location={IAdvertising.LOCATION.banner_box} />,
    Carrusel: <Carrusel itemPerPage={1} location={IAdvertising.LOCATION.carrusel} advertising={{ advertisingData: { ...advertisingData, data: advertisingData.data.filter(e => e.location === 'carrusel') } }} />,
    BannerPrimary: <Banner advertising={{ advertisingData }} location={IAdvertising.LOCATION.banner_primary} />,
    BannerSecondary: <Banner advertising={{ advertisingData }} location={IAdvertising.LOCATION.banner_secondary} />,
    CarruselMultiple: <Carrusel itemPerPage={2} location={IAdvertising.LOCATION.carrusel_multiple} advertising={{ advertisingData: { ...advertisingData, data: advertisingData.data.filter(e => e.location === 'carrusel-multiple') } }} />,
  };
}

export default useAdvertising;
