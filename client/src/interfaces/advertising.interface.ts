export namespace IAdvertising {
  export enum QUERY_KEY_PRODUCT {
    Advertising = 'advertising',
  }

  export enum LOCATION {
    carrusel = 'carrusel',
    carrusel_multiple = 'carrusel-multiple',
    banner_primary = 'banner-primary',
    banner_secondary = 'banner-secondary',
    banner_box = 'banner-box'
  }

  export type TotalLocation = IAdvertising.LOCATION.carrusel | IAdvertising.LOCATION.carrusel_multiple | IAdvertising.LOCATION.banner_primary | IAdvertising.LOCATION.banner_secondary | IAdvertising.LOCATION.banner_box

  export interface advertising {
    advertising_id: string;
    page: string;
    location: string;
    title: string;
    redirect: string;
    text: string;
    image_desktop: string;
    image_tablet: string;
    image_phone: string;
  }

}

