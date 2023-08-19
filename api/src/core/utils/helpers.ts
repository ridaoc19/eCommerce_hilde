import Department from "../../modules/department/model";

export async function products() {
  try {
    const departments = await Department.find()
      .populate({
        path: 'categoriesId',
        populate: {
          path: 'subcategoriesId',
          populate: {
            path: 'productsId',
          },
        },
      })
      .exec();

    return departments;
  } catch (error) {
    throw error;
  }
}



////// INTERFACE
interface Specification {
  [key: string]: string;
}
interface Product {
  _id: string;
  subcategoryId: string;
  name: string;
  price: string;
  specification: Specification[] | null;
  description: string;
  images: string[] | null;
  createdAt: string;
  updatedAt: string;
}
interface Subcategory {
  _id: string;
  name: string;
  productsId: Product[] | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  subcategoriesId: Subcategory[] | null;
  departmentId: string;
  createdAt: string;
  updatedAt: string;
}

interface Departments {
  _id: string;
  name: string;
  categoriesId: Category[] | null;
  createdAt: string;
  updatedAt: string;
}
