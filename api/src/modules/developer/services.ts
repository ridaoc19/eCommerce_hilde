import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppDataSource } from '../../core/db/postgres';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import { CategoryEntity } from '../categories/entity';
import { DepartmentEntity } from '../departments/entity';
import { NavigationEntity } from '../navigation/entity';
import { ProductEntity } from '../products/entity';
import { SubcategoryEntity } from '../subcategories/entity';
import { VariantEntity } from '../variants/entity';

interface Data {
  specification: Specification;
  product: string;
  brand: string;
  department: string;
  category: string;
  subcategory: string;
  description: string;
  variants: Variant[];
}

interface Variant {
  images: string[];
  attributes: Attributes;
  videos: string[];
  price: number;
  stock: number;
}

type Attributes = Record<string, string>

type Specification = Record<string, string>

export default {
  async loadBackup(_req: Request, res: Response) {
    try {

      const currentDirectory = __dirname; // Obtén el directorio actual
      const parentDirectory = join(currentDirectory, '..', '..', 'core', 'db', 'upload.json'); // Obtén el directorio superior

      const jsonData: Data[] = JSON.parse(readFileSync(parentDirectory, 'utf-8'));

      const departmentRepository = AppDataSource.getRepository(DepartmentEntity);
      const categoryRepository = AppDataSource.getRepository(CategoryEntity);
      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);
      const productRepository = AppDataSource.getRepository(ProductEntity);
      const variantRepository = AppDataSource.getRepository(VariantEntity);


      for (const dataJson of jsonData) {

        let existingDepartment = await departmentRepository.findOne({ where: { department: dataJson.department } });

        if (!existingDepartment) {
          existingDepartment = new DepartmentEntity();
          existingDepartment.department = dataJson.department
          await departmentRepository.save(existingDepartment);
        }

        let existingCategory = await categoryRepository.findOne({ where: { category: dataJson.category } });

        if (!existingCategory) {
          existingCategory = new CategoryEntity();
          existingCategory.category = dataJson.category
          existingCategory.department = existingDepartment
          await categoryRepository.save(existingCategory)
        }


        let existingSubcategory = await subcategoryRepository.findOne({ where: { subcategory: dataJson.subcategory } });

        if (!existingSubcategory) {
          existingSubcategory = new SubcategoryEntity();
          existingSubcategory.subcategory = dataJson.subcategory
          existingSubcategory.category = existingCategory
          await subcategoryRepository.save(existingSubcategory)
        }

        let existingProduct = await productRepository.findOne({ where: { product: dataJson.product } })

        if (!existingProduct) {
          existingProduct = new ProductEntity();
          existingProduct.product = dataJson.product
          existingProduct.brand = dataJson.brand
          existingProduct.description = dataJson.description
          existingProduct.specification = dataJson.specification
          existingProduct.subcategory = existingSubcategory
          await productRepository.save(existingProduct)

          // Crear entidad de navegación asociada a la variante
          const navigationRepository = AppDataSource.getRepository(NavigationEntity);
          const newNavigation = new NavigationEntity();
          // newNavigation.variant = newVariant;

          // Asignar otras entidades relacionadas
          newNavigation.product = existingProduct;
          newNavigation.subcategory = existingSubcategory;
          newNavigation.category = existingCategory;
          newNavigation.department = existingDepartment;

          // Guardar la entidad de navegación
          await navigationRepository.save(newNavigation);
        }

        for (const jstonVariant of dataJson.variants) {

          const newVariant = new VariantEntity();
          newVariant.attributes = jstonVariant.attributes
          newVariant.images = jstonVariant.images
          newVariant.price = jstonVariant.price
          newVariant.stock = jstonVariant.stock
          newVariant.videos = jstonVariant.videos
          newVariant.product = existingProduct
          await variantRepository.save(newVariant)


          // // Crear entidad de navegación asociada a la variante
          // const navigationRepository = AppDataSource.getRepository(NavigationEntity);
          // const newNavigation = new NavigationEntity();
          // newNavigation.variant = newVariant;

          // // Asignar otras entidades relacionadas
          // newNavigation.product = existingProduct;
          // newNavigation.subcategory = existingSubcategory;
          // newNavigation.category = existingCategory;
          // newNavigation.department = existingDepartment;

          // // Guardar la entidad de navegación
          // await navigationRepository.save(newNavigation);

        }
      }

      successHandler({
        res,
        dataDB: [],
        json: {
          field: 'department_create',
          message: 'Departamento creado',
          status_code: 201,
          status: StatusHTTP.created_201,
        },
      });
    } catch (error) {
      errorHandlerCatch({ error, res });
    }
  },
};
