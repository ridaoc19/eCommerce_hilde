import { ReactNode, useContext } from 'react';
import { CreateContext } from '../useContext';
import Carrusel from '../../components/common/carrusel/Carrusel';
import Banner from '../../components/common/Banner/Banner';
import BannerBox from '../../components/common/BannerBox/BannerBox';

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
    BannerBox: <BannerBox advertisingData={{ ...advertisingData, data: advertisingData.data.filter(e => e.location === 'banner-box') }} />,
    Carrusel: <Carrusel itemPerPage={1} advertising={advertisingData.data.filter(e => e.location === 'carrusel')} />,
    BannerPrimary: <Banner advertisingData={{ ...advertisingData, data: advertisingData.data.filter(e => e.location === 'banner-primary') }} />,
    BannerSecondary: <Banner advertisingData={{ ...advertisingData, data: advertisingData.data.filter(e => e.location === 'banner-secondary') }} />,
    CarruselMultiple: <Carrusel itemPerPage={2} advertising={advertisingData.data.filter(e => e.location === 'carrusel-multiple')} />,
  };
}

export default useAdvertising;
