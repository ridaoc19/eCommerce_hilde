export namespace IAdvertising {
  export enum QUERY_KEY_PRODUCT {
    Advertising = 'advertising',
  }

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

