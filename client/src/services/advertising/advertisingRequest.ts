import { IAdvertising } from "../../interfaces/advertising.interface";

export enum RouteAdvertising {
  AdvertisingCreate = 'post|advertising/create',
  AdvertisingEdit = 'post|advertising/edit',
  AdvertisingRequest = 'get|advertising/request',
}

export type RequestMapAdvertising = {
  [RouteAdvertising.AdvertisingCreate]: {
    route: RouteAdvertising.AdvertisingCreate;
    requestData: Omit<IAdvertising.advertising, 'advertising_id' | 'image_desktop' | 'image_phone' | 'image_tablet'> & { image_desktop: File | string, image_phone: File | string, image_tablet: File | string }
    data: IAdvertising.advertising[]
  },
  [RouteAdvertising.AdvertisingEdit]: {
    route: RouteAdvertising.AdvertisingEdit;
    requestData: Omit<IAdvertising.advertising, 'advertising_id'>
    extensionRoute: `/${string}`;
    data: IAdvertising.advertising[]
  },
  [RouteAdvertising.AdvertisingRequest]: {
    route: RouteAdvertising.AdvertisingRequest;
    data: IAdvertising.advertising[]
  },
};






