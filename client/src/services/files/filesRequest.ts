import { IFiles } from "../../interfaces/files.interface";

export enum RouteFiles {
  FilesRequest = 'get|files/request',
  FilesCreateDelete = 'post|files/create-delete',
}

export type RequestMapFiles = {
  [RouteFiles.FilesRequest]: {
    route: RouteFiles.FilesRequest;
    extensionRoute: `?entity=${string}&location=${string}&selected=${boolean}&name=${string}&typeFile=${string}`;
    data: {
      data: IFiles.Files[] | [],
      delete: string[] | [],
    };
  },
  [RouteFiles.FilesCreateDelete]: {
    route: RouteFiles.FilesCreateDelete;
    extensionRoute: `?entity=${string}&location=${string}&selected=${boolean}&name=${string}&typeFile=${string}`;
    requestData: {
      toStore: {
        file: File[],
        entity: string,
        location: string,
        typeFile: 'videos' | 'images'
        name: string
        selected: boolean
      },
      toDelete: string[]
    };
    data: {
      data: IFiles.Files[] | [],
      delete: string[] | [],
    };
  };

};