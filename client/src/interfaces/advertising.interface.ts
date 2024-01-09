export namespace IAdvertising {
  export enum QUERY_KEY_PRODUCT {
    Advertising = 'advertising',
  }

  export interface advertising {
    advertising_id: string;
    location: string;
    title: string;
    link: string;
    text: string;
    image: string;
  }

}

