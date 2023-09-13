import { IProduct } from "../../../../../interfaces/product.interface"

type GetBreadcrumb = (data: { data: IProduct.Department[], id: IProduct.Product['_id'] }) => string

export const getBreadcrumb: GetBreadcrumb = ({ data, id }) => {

  // Encuentra el departamento
  const department = data.find((dep) =>
    dep.categoriesId.some((cat) =>
      cat.subcategoriesId.some((subcat) =>
        subcat.productsId.some((product) => product._id === id)
      )
    )
  );

  if (!department) {
    return "Producto no encontrado";
  }

  // Encuentra la categoría
  const category = department.categoriesId.find((cat) =>
    cat.subcategoriesId.some((subcat) =>
      subcat.productsId.some((product) => product._id === id)
    )
  );

  if (!category) {
    return `${department.name} > Producto no encontrado`;
  }

  // Encuentra la sub categoría
  const subcategory = category.subcategoriesId.find((subcat) =>
    subcat.productsId.some((product) => product._id === id)
  );

  if (!subcategory) {
    return `${department.name} > ${category.name} > Producto no encontrado`;
  }

  // Encuentra el producto
  const producto = subcategory.productsId.find(
    (product) => product._id === id
  );

  if (!producto) {
    return `${department.name} > ${category.name} > ${subcategory.name} > Producto no encontrado`;
  }

  return `${department.name} > ${category.name} > ${subcategory.name} > ${producto.name}`;
}

export interface ItemType<T> {
  type: string;
  breadcrumb: string;
  data: T;
}


export function findItemById<T>({ id, products }: { id: string, products: IProduct.Department[] }): ItemType<T> {
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
