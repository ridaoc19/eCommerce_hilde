// import { IProduct } from "../interfaces/product.interface";
// // import { RouteProduct } from "../services/productRequest";
// import { IDashReducer } from "./useContext/dash/reducer";
// // import useQueryProduct from "./useQueryProduct";

// export interface BreadcrumbItem {
//   name: string;
//   _id: string;
//   contextName: IDashReducer.NameInventory;
//   name_id: 'department' | 'category' | 'subcategory' | 'product' | ''
// }

// export interface ItemType<T> {
//   type: string;
//   department: IProduct.Department & {
//     data: IProduct.Department[];
//   };
//   category: IProduct.Category & {
//     data: IProduct.Category[];
//   };
//   subcategory: IProduct.Subcategory & {
//     data: IProduct.Subcategory[];
//   };
//   product: IProduct.Product & {
//     data: IProduct.Product[];
//   };
//   breadcrumb: BreadcrumbItem[];
//   data: T;
// }

// function useProductFilter() {
//   const { isLoadingProduct, isFetchingProduct, dataProduct } = useQueryProduct({ route: RouteProduct.ProductRequest, options: {}, enabled: true })

//   function findItemById<T>({ id }: { id: string }): ItemType<T> {
//     const products = dataProduct ?? [];
//     const breadcrumb: BreadcrumbItem[] = [{ name: "Home", _id: "", contextName: 'departmentEmpty_id', name_id: '' },];

//     for (const department of products) {
//       if (department._id === id) {
//         breadcrumb.push({ name: department.department, _id: department._id, contextName: 'department_id', name_id: 'department' });
//         return {
//           type: "department",
//           department: { ...department, data: [department] },
//           category: { category: "", _id: "", departmentId: "", subcategoriesId: [], data: department.categoriesId },
//           subcategory: { subcategory: "", _id: "", categoryId: "", productsId: [], data: department.categoriesId.flatMap(cat => cat.subcategoriesId) },
//           product: { product: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: department.categoriesId.flatMap(cat => cat.subcategoriesId).flatMap(sub => sub.productsId) },
//           breadcrumb,
//           data: department as T,
//         };
//       }

//       for (const category of department.categoriesId) {
//         if (category._id === id) {
//           breadcrumb.push(
//             { name: department.department, _id: department._id, contextName: 'department_id', name_id: 'department' },
//             { name: category.category, _id: category._id, contextName: 'category_id', name_id: 'category' },
//           );
//           return {
//             type: "category",
//             department: { ...department, data: [department] },
//             category: { ...category, data: [category] },
//             subcategory: { subcategory: "", _id: "", categoryId: "", productsId: [], data: category.subcategoriesId },
//             product: { product: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: category.subcategoriesId.flatMap(sub => sub.productsId) },
//             breadcrumb,
//             data: category as T,
//           };
//         }

//         for (const subcategory of category.subcategoriesId) {
//           if (subcategory._id === id) {
//             breadcrumb.push(
//               { name: department.department, _id: department._id, contextName: 'department_id', name_id: 'department' },
//               { name: category.category, _id: category._id, contextName: 'category_id', name_id: 'category' },
//               { name: subcategory.subcategory, _id: subcategory._id, contextName: 'subcategory_id', name_id: 'subcategory' },

//             );
//             return {
//               type: "subcategory",
//               department: { ...department, data: [department] },
//               category: { ...category, data: [category] },
//               subcategory: { ...subcategory, data: [subcategory] },
//               product: { product: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: subcategory.productsId },
//               breadcrumb,
//               data: subcategory as T,
//             };
//           }

//           for (const product of subcategory.productsId) {
//             if (product._id === id || product.variants.some(variant => variant._id === id)) {
//               breadcrumb.push(
//                 { name: department.department, _id: department._id, contextName: 'department_id', name_id: 'department' },
//                 { name: category.category, _id: category._id, contextName: 'category_id', name_id: 'category' },
//                 { name: subcategory.subcategory, _id: subcategory._id, contextName: 'subcategory_id', name_id: 'subcategory' },
//                 { name: product.product, _id: product._id, contextName: 'products_id', name_id: 'product' }
//               );
//               const { variants } = product;
//               if (product._id === id) {
//                 return {
//                   type: "product",
//                   department: { ...department, data: [department] },
//                   category: { ...category, data: [category] },
//                   subcategory: { ...subcategory, data: [subcategory] },
//                   product: { ...product, data: [product] },
//                   breadcrumb,
//                   data: product as T,
//                 };
//               } else {
//                 const variantData = variants.find(variant => variant._id === id)!;
//                 return {
//                   type: "variant",
//                   department: { ...department, data: [department] },
//                   category: { ...category, data: [category] },
//                   subcategory: { ...subcategory, data: [subcategory] },
//                   product: { ...product, variants: [variantData], data: [product] },
//                   breadcrumb,
//                   data: product as T,
//                 };
//               }
//             }
//           }
//         }
//       }
//     }

//     return {
//       type: "products All",
//       department: { department: "", _id: "", categoriesId: [], data: products },
//       category: { category: "", _id: "", departmentId: "", subcategoriesId: [], data: products.flatMap(dep => dep.categoriesId) },
//       subcategory: { subcategory: "", _id: "", categoryId: "", productsId: [], data: products.flatMap(dep => dep.categoriesId).flatMap(cat => cat.subcategoriesId) },
//       product: { product: "", brand: "", description: "", specification: [], images: [], _id: "", subcategoryId: "", variants: [], data: products.flatMap(dep => dep.categoriesId).flatMap(cat => cat.subcategoriesId).flatMap(sub => sub.productsId) },
//       breadcrumb,
//       data: products as T,
//     };
//   }

//   return { findItemById, isFetching: isFetchingProduct, isLoadingProduct };
// }

// export default useProductFilter;

function useProductFilter() {
  return (
    <div>
      
    </div>
  );
}

export default useProductFilter;