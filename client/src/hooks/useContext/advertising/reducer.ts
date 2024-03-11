import { ErrorAdvertising } from "../../../services/advertising/advertisingApi";
import { RequestMapAdvertising, RouteAdvertising } from "../../../services/advertising/advertisingRequest";

export namespace IAdvertisingReducer {
  export type AppState = {
    advertisingData: {
      data: RequestMapAdvertising[RouteAdvertising.AdvertisingRequest]['data']
      isLoading: boolean
      isFetching: boolean
      errors: ErrorAdvertising['errors'] | []
    },
  };

  export type AppAction<T> = {
    type: keyof T;
    payload: T[keyof T]
  };

  export type Reducer = (state: AppState, action: AppAction<AppState>) => AppState
}

const initialStateAdvertising: IAdvertisingReducer.AppState = {
  advertisingData: {
    isLoading: false,
    isFetching: false,
    data: { dataAdvertising: [], topViewedProducts: [] },
    errors: []
  }
};

const reducer: IAdvertisingReducer.Reducer = (state, action) => {

  switch (action.type) {
    case "advertisingData":
      return { ...state, advertisingData: action.payload }
    default:
      return state;
  }
};

export { initialStateAdvertising, reducer };

