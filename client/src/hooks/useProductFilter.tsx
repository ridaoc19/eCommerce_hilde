import { useQuery } from "@tanstack/react-query";
import { IDashReducer } from "../interfaces/hooks/context.interface";
import { IProduct } from "../interfaces/product.interface";
import { MakeProductsRequestReturn } from "../services/productApi";

export interface BreadcrumbItem {
  name: string;
  _id: string;
  contextName: IDashReducer.NameInventory;
}

export interface ItemType<T> {
  type: string;
  department: IProduct.Department & {
    data: IProduct.Department[];
  };
  category: IProduct.Category & {
    data: IProduct.Category[];
  };
  subcategory: IProduct.Subcategory & {
    data: IProduct.Subcategory[];
  };
  product: IProduct.Product & {
    data: IProduct.Product[];
  };
  breadcrumb: BreadcrumbItem[];
  data: T;
}

function useProductFilter() {
  const { data, isFetching } = useQuery<MakeProductsRequestReturn>({
    queryKey: IProduct.PRODUCT_NAME_QUERY,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  function findItemById<T>({ id }: { id: string }): ItemType<T> {
    const products = data?.products ?? [];
    const breadcrumb: BreadcrumbItem[] = [{ name: "Home", _id: "", contextName: 'departmentEmpty_id' },];

    for (const department of products) {
      if (department._id === id) {
        breadcrumb.push({ name: department.name, _id: department._id, contextName: 'department_id' });
        return {
          type: "department",
          department: { ...department, data: [department] },
          category: { name: "", _id: "", departmentId: "", subcategoriesId: [], data: department.categoriesId },
          subcategory: { name: "", _id: "", categoryId: "", productsId: [], data: department.categoriesId.flatMap(cat => cat.subcategoriesId) },
          product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: department.categoriesId.flatMap(cat => cat.subcategoriesId).flatMap(sub => sub.productsId) },
          breadcrumb,
          data: department as T,
        };
      }

      for (const category of department.categoriesId) {
        if (category._id === id) {
          breadcrumb.push(
            { name: department.name, _id: department._id, contextName: 'department_id' },
            { name: category.name, _id: category._id, contextName: 'category_id' },
          );
          return {
            type: "category",
            department: { ...department, data: [department] },
            category: { ...category, data: [category] },
            subcategory: { name: "", _id: "", categoryId: "", productsId: [], data: category.subcategoriesId },
            product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: category.subcategoriesId.flatMap(sub => sub.productsId) },
            breadcrumb,
            data: category as T,
          };
        }

        for (const subcategory of category.subcategoriesId) {
          if (subcategory._id === id) {
            breadcrumb.push(
              { name: department.name, _id: department._id, contextName: 'department_id' },
              { name: category.name, _id: category._id, contextName: 'category_id' },
              { name: subcategory.name, _id: subcategory._id, contextName: 'subcategory_id' },

            );
            return {
              type: "subcategory",
              department: { ...department, data: [department] },
              category: { ...category, data: [category] },
              subcategory: { ...subcategory, data: [subcategory] },
              product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: subcategory.productsId },
              breadcrumb,
              data: subcategory as T,
            };
          }

          for (const product of subcategory.productsId) {
            if (product._id === id || product.variants.some(variant => variant._id === id)) {
              breadcrumb.push(
                { name: department.name, _id: department._id, contextName: 'department_id' },
                { name: category.name, _id: category._id, contextName: 'category_id' },
                { name: subcategory.name, _id: subcategory._id, contextName: 'subcategory_id' },
                { name: product.name, _id: product._id, contextName: 'products_id' }
              );
              const { variants } = product;
              if (product._id === id) {
                return {
                  type: "product",
                  department: { ...department, data: [department] },
                  category: { ...category, data: [category] },
                  subcategory: { ...subcategory, data: [subcategory] },
                  product: { ...product, data: [product] },
                  breadcrumb,
                  data: product as T,
                };
              } else {
                const variantData = variants.find(variant => variant._id === id)!;
                return {
                  type: "variant",
                  department: { ...department, data: [department] },
                  category: { ...category, data: [category] },
                  subcategory: { ...subcategory, data: [subcategory] },
                  product: { ...product, variants: [variantData], data: [product] },
                  breadcrumb,
                  data: product as T,
                };
              }
            }
          }
        }
      }
    }

    return {
      type: "products All",
      department: { name: "", _id: "", categoriesId: [], data: products },
      category: { name: "", _id: "", departmentId: "", subcategoriesId: [], data: products.flatMap(dep => dep.categoriesId) },
      subcategory: { name: "", _id: "", categoryId: "", productsId: [], data: products.flatMap(dep => dep.categoriesId).flatMap(cat => cat.subcategoriesId) },
      product: { name: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: products.flatMap(dep => dep.categoriesId).flatMap(cat => cat.subcategoriesId).flatMap(sub => sub.productsId) },
      breadcrumb,
      data: products as T,
    };
  }

  return { findItemById, isFetching };
}

export default useProductFilter;