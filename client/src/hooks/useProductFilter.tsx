// import { useState, useEffect } from "react";
import { IProduct } from "../interfaces/product.interface";
import { useQueryClient } from "@tanstack/react-query";
import { MakeProductsRequestReturn } from "../services/productApi";

// interface ProductFilterState {
//   productsTotal: IProduct.Department[];
// }

export interface ItemType<T> {
  type: string;
  breadcrumb: string;
  data: T;
}

// const initialProductFilterState: ProductFilterState = {
//   productsTotal: [],
// }

function useProductFilter() {
  // const [productFilterState, setProductFilterState] = useState<ProductFilterState>(initialProductFilterState);

  const queryClient = useQueryClient();
  const { products }: MakeProductsRequestReturn = queryClient.getQueryData(IProduct.PRODUCT_NAME_QUERY)!
  // const isLoading = queryClient.isFetching(IProduct.PRODUCT_NAME_QUERY);
  // useEffect(() => {
  //   setProductFilterState({ ...productFilterState, productsTotal: products })
  // }, [products, isLoading])

  function findItemById<T>({ id }: { id: string }): ItemType<T> {
    for (const department of products) {
      if (department._id === id) {
        // Si el ID coincide con un departamento
        return {
          type: "department",
          breadcrumb: department.name,
          data: department as T,
        };
      }

      for (const category of department.categoriesId) {
        if (category._id === id) {
          // Si el ID coincide con una categoría
          return {
            type: "category",
            breadcrumb: `${department.name} > ${category.name}`,
            data: category as T,
          };
        }

        for (const subcategory of category.subcategoriesId) {
          if (subcategory._id === id) {
            // Si el ID coincide con una subcategoría
            return {
              type: "subcategory",
              breadcrumb: `${department.name} > ${category.name} > ${subcategory.name}`,
              data: subcategory as T,
            };
          }

          for (const product of subcategory.productsId) {
            if (product._id === id) {
              // Si el ID coincide con un producto
              return {
                type: "product",
                breadcrumb: `${department.name} > ${category.name} > ${subcategory.name} > ${product.name}`,
                data: product as T,
              };
            }
          }
        }
      }
    }

    // Si no se encuentra ningún elemento con el ID proporcionado
    return {
      type: "products All",
      breadcrumb: "",
      data: products as T,
    };
  }



  return { findItemById };
}

export default useProductFilter;
