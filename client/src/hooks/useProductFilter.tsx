import { useQueryClient } from "@tanstack/react-query";
import { IProduct } from "../interfaces/product.interface";
import { MakeProductsRequestReturn } from "../services/productApi";

interface Specification {
  [key: string]: string;
}
export interface ItemType<T> {
  type: string;
  department: {
    _id: string
    name: string,
    data: IProduct.Department[]
  };
  category: {
    _id: string
    name: string,
    data: IProduct.Category[]
  };
  subcategory: {
    _id: string
    name: string,
    data: IProduct.Subcategory[]
  };
  product: {
    _id: string
    name: string,
    brand: string,
    description: string,
    specification: Specification[],
    images: string[],
    data: IProduct.Product[]
  };
  breadcrumb: string;
  data: T;
}


function useProductFilter() {
  const queryClient = useQueryClient();
  const data: MakeProductsRequestReturn = queryClient.getQueryData(IProduct.PRODUCT_NAME_QUERY)!

  function findItemById<T>({ id }: { id: string }): ItemType<T> {
    const products = data?.products ? data.products : []
    for (const department of products) {
      if (department._id === id) {
        return {
          type: "department",
          department: { name: department.name, _id: department._id, data: [department] },
          category: { name: "", _id: "", data: department.categoriesId },
          subcategory: { name: "", _id: "", data: department.categoriesId.flatMap(cat => cat.subcategoriesId) },
          product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", data: department.categoriesId.flatMap(cat => cat.subcategoriesId).flatMap(sub => sub.productsId) },
          breadcrumb: department.name,
          data: department as T,
        };
      }

      for (const category of department.categoriesId) {
        if (category._id === id) {
          return {
            type: "category",
            department: { name: department.name, _id: department._id, data: [department] },
            category: { name: category.name, _id: category._id, data: [category] },
            subcategory: { name: "", _id: "", data: category.subcategoriesId },
            product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", data: category.subcategoriesId.flatMap(sub => sub.productsId) },
            breadcrumb: `${department.name} > ${category.name}`,
            data: category as T,
          };
        }

        for (const subcategory of category.subcategoriesId) {
          if (subcategory._id === id) {
            return {
              type: "subcategory",
              department: { name: department.name, _id: department._id, data: [department] },
              category: { name: category.name, _id: category._id, data: [category] },
              subcategory: { name: subcategory.name, _id: subcategory._id, data: [subcategory] },
              product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", data: subcategory.productsId },
              breadcrumb: `${department.name} > ${category.name} > ${subcategory.name}`,
              data: subcategory as T,
            };
          }

          for (const product of subcategory.productsId) {
            if (product._id === id) {
              const { _id, name, brand, description, specification, images } = product;
              return {
                type: "product",
                department: { name: department.name, _id: department._id, data: [department] },
                category: { name: category.name, _id: category._id, data: [category] },
                subcategory: { name: subcategory.name, _id: subcategory._id, data: [subcategory] },
                product: { _id: _id, name, brand, description, specification, images, data: [product] },
                breadcrumb: `${department.name} > ${category.name} > ${subcategory.name} > ${product.name}`,
                data: product as T,
              };
            }
          }
        }
      }
    }

    return {
      type: "products All",
      department: { name: "", _id: "", data: products },
      category: { name: "", _id: "", data: products.flatMap(dep => dep.categoriesId) },
      subcategory: { name: "", _id: "", data: products.flatMap(dep => dep.categoriesId).flatMap(cat => cat.subcategoriesId) },
      product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", data: products.flatMap(dep => dep.categoriesId).flatMap(cat => cat.subcategoriesId).flatMap(sub => sub.productsId) },
      breadcrumb: "",
      data: products as T,
    };
  }



  return { findItemById };
}

export default useProductFilter;
