import { IAdvertising } from "../../interfaces/advertising.interface";
import { IProduct } from "../../interfaces/product.interface";

export enum RouteAdvertising {
  AdvertisingCreate = 'post|advertising/create',
  AdvertisingEdit = 'put|advertising/edit',
  AdvertisingDelete = 'delete|advertising/delete',
  AdvertisingRequest = 'get|advertising/request',
}

export interface TopViewedProducts extends Pick<IProduct.Product, 'product_id' | 'product' | 'brand'> {
  images: string,
  price: Array<number>
}

export type RequestMapAdvertising = {
  [RouteAdvertising.AdvertisingCreate]: {
    route: RouteAdvertising.AdvertisingCreate;
    requestData: Omit<IAdvertising.advertising, 'advertising_id'>
    data: {
      dataAdvertising: IAdvertising.advertising[]
      topViewedProducts: TopViewedProducts[]
    }
  },
  [RouteAdvertising.AdvertisingEdit]: {
    route: RouteAdvertising.AdvertisingEdit;
    requestData: Omit<IAdvertising.advertising, 'advertising_id'>
    extensionRoute: `/${string}`;
    data: {
      dataAdvertising: IAdvertising.advertising[]
      topViewedProducts: TopViewedProducts[]
    }
  },
  [RouteAdvertising.AdvertisingDelete]: {
    route: RouteAdvertising.AdvertisingDelete;
    extensionRoute: `/${string}`;
    data: {
      dataAdvertising: IAdvertising.advertising[]
      topViewedProducts: TopViewedProducts[]
    }
  },
  [RouteAdvertising.AdvertisingRequest]: {
    route: RouteAdvertising.AdvertisingRequest;
    data: {
      dataAdvertising: IAdvertising.advertising[]
      topViewedProducts: TopViewedProducts[]
    }
  },
};






