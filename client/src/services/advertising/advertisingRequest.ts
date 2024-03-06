import { IAdvertising } from "../../interfaces/advertising.interface";

export enum RouteAdvertising {
  AdvertisingCreate = 'post|advertising/create',
  AdvertisingEdit = 'put|advertising/edit',
  AdvertisingDelete = 'delete|advertising/delete',
  AdvertisingRequest = 'get|advertising/request',
}

export type RequestMapAdvertising = {
  [RouteAdvertising.AdvertisingCreate]: {
    route: RouteAdvertising.AdvertisingCreate;
    requestData: Omit<IAdvertising.advertising, 'advertising_id'>
    data: IAdvertising.advertising[]
  },
  [RouteAdvertising.AdvertisingEdit]: {
    route: RouteAdvertising.AdvertisingEdit;
    requestData: Omit<IAdvertising.advertising, 'advertising_id'>
    extensionRoute: `/${string}`;
    data: IAdvertising.advertising[]
  },
  [RouteAdvertising.AdvertisingDelete]: {
    route: RouteAdvertising.AdvertisingDelete;
    extensionRoute: `/${string}`;
    data: IAdvertising.advertising[]
  },
  [RouteAdvertising.AdvertisingRequest]: {
    route: RouteAdvertising.AdvertisingRequest;
    data: IAdvertising.advertising[]
  },
};






