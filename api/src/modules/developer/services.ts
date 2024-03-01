import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { errorHandlerCatch } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import CategoryEntity from '../category/entity';
import DepartmentEntity from '../department/entity';
import NavigationEntity from '../navigation/entity';
import ProductEntity from '../product/entity';
import SubcategoryEntity from '../subcategory/entity';
import VariantEntity from '../variant/entity';
import { AppDataSource } from '../../data-source';
import { StatusHTTP } from '../../core/utils/send/enums';

interface Data {
  specification: Specification;
  product: string;
  brand: string;
  department: string;
  category: string;
  subcategory: string;
  description: string;
  benefits: string[];
  contents: string;
  warranty: string;
  variants: Variant[];
}

interface Variant {
  images: string[];
  attributes: Attributes;
  videos: string[];
  price: number;
  stock: number;
  listPrice: number;
}

type Attributes = Record<string, string>

type Specification = Record<string, string>

export default {
  async loadBackup(req: Request, res: Response) {
    try {

      const currentDirectory = __dirname; // Obtén el directorio actual
      // const parentDirectory = join(currentDirectory, '..', '..', 'core', 'db', 'tempo.json'); // Obtén el directorio superior
      const parentDirectory = join(currentDirectory, '..', '..', 'core', 'db', 'upload.json'); // Obtén el directorio superior

      const jsonData: NewData[] = JSON.parse(readFileSync(parentDirectory, 'utf-8'));

      const departmentRepository = AppDataSource.getRepository(DepartmentEntity);
      const categoryRepository = AppDataSource.getRepository(CategoryEntity);
      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);
      const productRepository = AppDataSource.getRepository(ProductEntity);
      const variantRepository = AppDataSource.getRepository(VariantEntity);
      const navigationRepository = AppDataSource.getRepository(NavigationEntity);

      // const data = jsonData
      // const data = jsonData.filter(e => e.variants.some(i => i.videos.length > 0 && Object.keys(i.attributes).length > 0)).slice(0, 3)
      // const data = jsonData.slice(3, 6)

      for (const department of jsonData) {
        const existingDepartment = new DepartmentEntity();
        existingDepartment.department = department.department
        await departmentRepository.save(existingDepartment);

        for (const category of department.children) {
          const existingCategory = new CategoryEntity();
          existingCategory.category = category.category
          existingCategory.department = existingDepartment
          await categoryRepository.save(existingCategory)

          for (const subcategory of category.children) {
            const existingSubcategory = new SubcategoryEntity();
            existingSubcategory.subcategory = subcategory.subcategory
            existingSubcategory.category = existingCategory
            await subcategoryRepository.save(existingSubcategory)

            for (const product of subcategory.children) {
              const existingProduct = new ProductEntity();
              existingProduct.product = product.product
              existingProduct.brand = product.brand
              existingProduct.description = product.description
              existingProduct.specifications = product.specification
              existingProduct.benefits = product.benefits
              existingProduct.contents = product.contents
              existingProduct.warranty = product.warranty

              existingProduct.subcategory = existingSubcategory
              await productRepository.save(existingProduct)


              // Crear entidad de navegación asociada a la variante
              const newNavigation = new NavigationEntity();
              // newNavigation.variant = newVariant;

              // Asignar otras entidades relacionadas
              newNavigation.product = existingProduct;
              newNavigation.subcategory = existingSubcategory;
              newNavigation.category = existingCategory;
              newNavigation.department = existingDepartment;

              // Guardar la entidad de navegación
              await navigationRepository.save(newNavigation);

              for (const variant of product.variants) {
                const newVariant = new VariantEntity();
                newVariant.attributes = variant.attributes
                newVariant.images = variant.images
                newVariant.price = variant.price
                newVariant.listPrice = variant.listPrice
                newVariant.stock = variant.stock
                newVariant.videos = variant.videos
                newVariant.product = existingProduct

                newVariant.navigation = newNavigation;

                await variantRepository.save(newVariant)

              }
            }

          }

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
      errorHandlerCatch({ req, error, res });
    }
  },
  async loadBackupOld(req: Request, res: Response) {
    try {

      const currentDirectory = __dirname; // Obtén el directorio actual
      // const parentDirectory = join(currentDirectory, '..', '..', 'core', 'db', 'tempo.json'); // Obtén el directorio superior
      const parentDirectory = join(currentDirectory, '..', '..', 'core', 'db', 'upload.json'); // Obtén el directorio superior

      const jsonData: Data[] = JSON.parse(readFileSync(parentDirectory, 'utf-8'));

      const departmentRepository = AppDataSource.getRepository(DepartmentEntity);
      const categoryRepository = AppDataSource.getRepository(CategoryEntity);
      const subcategoryRepository = AppDataSource.getRepository(SubcategoryEntity);
      const productRepository = AppDataSource.getRepository(ProductEntity);
      const variantRepository = AppDataSource.getRepository(VariantEntity);
      const navigationRepository = AppDataSource.getRepository(NavigationEntity);

      const data = jsonData
      // const data = jsonData.filter(e => e.variants.some(i => i.videos.length > 0 && Object.keys(i.attributes).length > 0)).slice(0, 3)
      // const data = jsonData.slice(3, 6)

      for (const dataJson of data) {

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
          existingProduct.specifications = dataJson.specification
          existingProduct.benefits = dataJson.benefits
          existingProduct.contents = dataJson.contents
          existingProduct.warranty = dataJson.warranty

          existingProduct.subcategory = existingSubcategory
          await productRepository.save(existingProduct)


          // Crear entidad de navegación asociada a la variante
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
          let existingNavigation = await navigationRepository.findOne({ where: { product: { product_id: existingProduct.product_id } } });


          const newVariant = new VariantEntity();
          newVariant.attributes = jstonVariant.attributes
          newVariant.images = jstonVariant.images
          newVariant.price = jstonVariant.price
          newVariant.listPrice = jstonVariant.listPrice
          newVariant.stock = jstonVariant.stock
          newVariant.videos = jstonVariant.videos
          newVariant.product = existingProduct

          if (existingNavigation) {
            newVariant.navigation = existingNavigation;
          }

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
      errorHandlerCatch({ req, error, res });
    }
  },
  async clearEnsayo(_req: Request, res: Response) {
    const currentDirectory = __dirname; // Obtén el directorio actual
    const parentDirectory = join(currentDirectory, '..', '..', 'core', 'db', 'upload.json'); // Obtén el directorio superior
    const jsonData: DataTotal[] = JSON.parse(readFileSync(parentDirectory, 'utf-8'));

    const filter = jsonData.filter(e => e.variants.some(d => !d.images))

    res.json({ jsonData: jsonData.length, filter: filter })
  }
};


interface DataTotal {
  specification: Specification;
  productId: string;
  productName: string;
  brand: string;
  department: string;
  category: string;
  subcategory: string;
  description: string;
  benefits: string[];
  contents: string;
  warranty: string;
  variants: Variantt[];
}

interface Variantt {
  itemId: string;
  images: string[];
  attributes: Attributes;
  videos: string[];
  ListPrice: number;
  price: number;
  stock: number;
}





interface NewData {
  department: string;
  children: Child3[];
}

interface Child3 {
  category: string;
  children: Child2[];
}

interface Child2 {
  subcategory: string;
  children: Child[];
}

interface Child {
  productId: string;
  product: string;
  brand: string;
  benefits: string[];
  category: string;
  contents: string;
  department: string;
  description: string;
  specification: Specification;
  subcategory: string;
  variants: Variant[];
  warranty: string;
  breadcrumb: string[];
}

interface Variant {
  itemId: string;
  attributes: Attributes;
  images: string[];
  listPrice: number;
  price: number;
  stock: number;
  videos: string[];
}

