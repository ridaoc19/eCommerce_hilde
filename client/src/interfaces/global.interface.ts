import { ChangeEvent, MouseEvent } from "react";

export enum Method {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete'
}

export type HandleClick = (event: MouseEvent<HTMLButtonElement>) => void
export type HandleChangeText = (event: ChangeEvent<HTMLInputElement>) => void
export type HandleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => void
export type handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => void
export type HandleChangeTextSelect = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void


// BREADCRUMB
export enum BreadcrumbType {
  Department = 'department',
  Category = 'category',
  Subcategory = 'subcategory',
  Product = 'product',
  Variant = 'variant',
}

export interface Data {
  name: string;
  _id: string;
  name_id: 'department' | 'category' | 'subcategory' | 'product'
}

export type MapEntityBreadcrumb = {
  [BreadcrumbType.Department]: {
    entity: BreadcrumbType.Department;
    data: Data[]
  };

  [BreadcrumbType.Category]: {
    entity: BreadcrumbType.Category;
    data: Data[]
  };

  [BreadcrumbType.Subcategory]: {
    entity: BreadcrumbType.Subcategory;
    data: Data[]
  };

  [BreadcrumbType.Product]: {
    entity: BreadcrumbType.Product;
    data: Data[]
  };

  [BreadcrumbType.Variant]: {
    entity: BreadcrumbType.Variant;
    data: Data[]
  };

};