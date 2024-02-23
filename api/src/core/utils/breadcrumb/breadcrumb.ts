import { AppDataSource } from "../../../data-source";
import CategoryEntity from "../../../modules/category/entity";
import DepartmentEntity from "../../../modules/department/entity";
import ProductEntity from "../../../modules/product/entity";
import SubcategoryEntity from "../../../modules/subcategory/entity";
import VariantEntity from "../../../modules/variant/entity";
import { findParentUUID } from "../findParentUUID";

export interface Data {
  name: string;
  _id: string;
  name_id: 'department' | 'category' | 'subcategory' | 'product' | 'search'
}

// Define tipos para las entidades anidadas
type Department = {
  entity: 'department';
  data: Data[];
};

type Category = {
  entity: 'category';
  data: Data[];
};

type Subcategory = {
  entity: 'subcategory';
  data: Data[];
};

type Product = {
  entity: 'product';
  data: Data[];
};

type Variant = {
  entity: 'variant';
  data: Data[];
}

type Search = {
  entity: 'search';
  data: Data[];
}

// Define el tipo de retorno para la función de breadcrumbs
export type GetBreadcrumbsReturn = Department | Category | Subcategory | Product | Variant | Search | null;
type GetEntityBreadcrumbs = Department | Category | Subcategory | Product | Variant | Search;

export async function getBreadcrumbs(entityId: string): Promise<GetBreadcrumbsReturn> {
  const entityTypes = ['search', 'department', 'category', 'subcategory', 'product', 'variant'];

  for (const entityType of entityTypes) {
    const breadcrumb = await getEntityBreadcrumbs(entityType, entityId);

    if (breadcrumb && breadcrumb.data.length > 0) {
      return breadcrumb;
    }
  }

  return null;
}

async function getEntityBreadcrumbs(entityType: string, entityId: string): Promise<GetEntityBreadcrumbs | null> {
  switch (entityType) {
    case 'search':

      const search: Data[] = findParentUUID(entityId) ? [] : [{
        _id: "",
        name: entityId,
        name_id: "search"
      }]

      return {
        entity: 'search',
        data: search
      };


    case 'department':
      const responseDepartment = await AppDataSource.getRepository(DepartmentEntity)
        .createQueryBuilder('department')
        .where({ department_id: entityId })
        .select(['department.department_id', 'department.department'])
        .getMany();

      let dep = responseDepartment[0];

      const departments: Data[] = dep ? [{
        _id: dep.department_id,
        name: dep.department,
        name_id: "department"
      }] : []

      return {
        entity: 'department',
        data: departments
      };

    case 'category':
      const responseCategory = await AppDataSource.getRepository(CategoryEntity)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ category_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
        ])
        .getMany();

      const cat = responseCategory[0]

      const categories: Data[] = cat ? [
        {
          _id: cat.department.department_id,
          name: cat.department.department,
          name_id: 'department'

        },
        {
          _id: cat.category_id,
          name: cat.category,
          name_id: 'category'
        },
      ] : []

      return {
        entity: 'category',
        data: categories,
      };

    case 'subcategory':
      const responseSubcategory = await AppDataSource.getRepository(SubcategoryEntity)
        .createQueryBuilder('subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ subcategory_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
        ])
        .getMany();

      const sub = responseSubcategory[0]

      const subcategories: Data[] = sub ? [
        {
          _id: sub.category.department.department_id,
          name: sub.category.department.department,
          name_id: 'department'

        },
        {
          _id: sub.category.category_id,
          name: sub.category.category,
          name_id: 'category'
        },
        {
          _id: sub.subcategory_id,
          name: sub.subcategory,
          name_id: 'subcategory'
        },
      ] : []


      return {
        entity: 'subcategory',
        data: subcategories,
      };

    case 'product':
      const responseProduct = await AppDataSource.getRepository(ProductEntity)
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ product_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
          'product.product_id', 'product.product',
        ])
        .getMany();

      const pro = responseProduct[0]

      const products: Data[] = pro ? [
        {
          _id: pro.subcategory.category.department.department_id,
          name: pro.subcategory.category.department.department,
          name_id: 'department'

        },
        {
          _id: pro.subcategory.category.category_id,
          name: pro.subcategory.category.category,
          name_id: 'category'
        },
        {
          _id: pro.subcategory.subcategory_id,
          name: pro.subcategory.subcategory,
          name_id: 'subcategory'
        },
        {
          _id: pro.product_id,
          name: pro.product,
          name_id: 'product'
        },
      ] : []

      return {
        entity: 'product',
        data: products,
      };

    case 'variant':
      const responseVariant = await AppDataSource.getRepository(VariantEntity)
        .createQueryBuilder('variant')
        .leftJoinAndSelect('variant.product', 'product')
        .leftJoinAndSelect('product.subcategory', 'subcategory')
        .leftJoinAndSelect('subcategory.category', 'category')
        .leftJoinAndSelect('category.department', 'department')
        .where({ variant_id: entityId })
        .select([
          'department.department_id', 'department.department',
          'category.category_id', 'category.category',
          'subcategory.subcategory_id', 'subcategory.subcategory',
          'product.product_id', 'product.product',
          'variant.variant_id',
        ])
        .getMany();

      const vari = responseVariant[0]

      const variants: Data[] = vari ? [
        {
          _id: vari.product.subcategory.category.department.department_id,
          name: vari.product.subcategory.category.department.department,
          name_id: 'department'

        },
        {
          _id: vari.product.subcategory.category.category_id,
          name: vari.product.subcategory.category.category,
          name_id: 'category'
        },
        {
          _id: vari.product.subcategory.subcategory_id,
          name: vari.product.subcategory.subcategory,
          name_id: 'subcategory'
        },
        {
          _id: vari.product.product_id,
          name: vari.product.product,
          name_id: 'product'
        },
      ] : []


      return {
        entity: 'variant',
        data: variants,
      };

    default:
      return null;
  }
}


// type Department = {
//   entity: 'department';
//   data: {
//     department_id: string;
//     department: string;
//   };
// };

// type Category = {
//   entity: 'category';
//   data: {
//     category_id: string;
//     category: string;
//     department: DepartmentEntity;
//   };
// };

// type Subcategory = {
//   entity: 'subcategory';
//   data: {
//     subcategory_id: string;
//     subcategory: string;
//     category: CategoryEntity;
//   };
// };

// type Product = {
//   entity: 'product';
//   data: {
//     product_id: string;
//     product: string;
//     subcategory: SubcategoryEntity;
//   };
// };

// type Variant = {
//   entity: 'variant';
//   data: {
//     variant_id: string;
//     product: ProductEntity;
//   };
// };
