import { ReactNode, useContext } from 'react';
import Banner from '../../components/common/Banner/Banner';
import BannerBox from '../../components/common/BannerBox/BannerBox';
import Carrusel from '../../components/common/carrusel/Carrusel';
import { IAdvertising } from '../../interfaces/advertising.interface';
import { CreateContext, IContextData } from '../useContext';
import Showcase from '../../components/common/showcase/Sowcase';

interface UseAdvertising {
  BannerBox: ReactNode;
  Carrusel: ReactNode;
  BannerPrimary: ReactNode;
  BannerSecondary: ReactNode;
  CarruselMultiple: ReactNode;
  ShowcaseProductView: ReactNode
}

export interface ParamsChildren {
  advertising: IContextData['advertising']['advertisingContextState']['advertisingData']['data']['dataAdvertising']
  isFetching: boolean
  isLoading: boolean,
  location: IAdvertising.TotalLocation
}

function useAdvertising(): UseAdvertising {
  const { advertising: { advertisingContextState: { advertisingData: { data: { dataAdvertising, topViewedProducts }, isFetching, isLoading } } } } = useContext(CreateContext);
console.log(topViewedProducts)
  return {
    BannerBox: <BannerBox advertising={dataAdvertising.filter(e => e.location === IAdvertising.LOCATION.banner_box)} isFetching={isFetching} isLoading={isLoading} location={IAdvertising.LOCATION.banner_box} />,
    Carrusel: <Carrusel itemPerPage={1} location={IAdvertising.LOCATION.carrusel} isFetching={isFetching} isLoading={isLoading} advertising={dataAdvertising.filter(e => e.location === IAdvertising.LOCATION.carrusel)} />,
    BannerPrimary: <Banner location={IAdvertising.LOCATION.banner_primary} isFetching={isFetching} isLoading={isLoading} advertising={dataAdvertising.filter(e => e.location === IAdvertising.LOCATION.banner_primary)} />,
    BannerSecondary: <Banner location={IAdvertising.LOCATION.banner_secondary} isFetching={isFetching} isLoading={isLoading} advertising={dataAdvertising.filter(e => e.location === IAdvertising.LOCATION.banner_secondary)} />,
    CarruselMultiple: <Carrusel itemPerPage={2} location={IAdvertising.LOCATION.carrusel_multiple} isFetching={isFetching} isLoading={isLoading} advertising={dataAdvertising.filter(e => e.location === IAdvertising.LOCATION.carrusel_multiple)} />,
    ShowcaseProductView: topViewedProducts.length > 0 ? <Showcase title='Lo mas visto' products={topViewedProducts.map(({brand, images, price, product, product_id}) => {
      return {
        product_id,brand, images, price, product
      }
    })} /> : null,
  };
}

export default useAdvertising;
