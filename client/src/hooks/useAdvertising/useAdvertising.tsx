// useAdvertising.tsx
import { ReactNode, useContext } from 'react';
import Carrusel from '../../components/common/carrusel/Carrusel';
import { CreateContext } from '../useContext';
import Banner from './Banner';
import BannerBox from './BannerBox';

interface UseAdvertising {
  BannerBox: ReactNode;
  Carrusel: ReactNode;
  BannerPrimary: ReactNode;
  BannerSecondary: ReactNode;
}

function useAdvertising(): UseAdvertising {
  const { advertising: { advertisingContextState: { advertisingData } } } = useContext(CreateContext)!;

  return {
    BannerBox: <BannerBox advertisingData={advertisingData} />,
    Carrusel: <Carrusel advertising={advertisingData.data.filter(e => e.location === 'carrusel')} />,
    BannerPrimary: <Banner advertisingData={{ ...advertisingData, data: advertisingData.data.filter(e => e.location === 'banner-primary') }} />,
    BannerSecondary: <Banner advertisingData={{ ...advertisingData, data: advertisingData.data.filter(e => e.location === 'banner-secondary') }} />,
  };
}

export default useAdvertising;
