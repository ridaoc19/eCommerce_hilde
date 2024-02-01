import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppDataSource } from '../../core/db/postgres';
import { StatusHTTP } from '../../core/utils/enums';
import { errorHandlerCatch } from '../../core/utils/send/errorHandler';
import { successHandler } from '../../core/utils/send/successHandler';
import CategoryEntity from '../categories/entity';
import DepartmentEntity from '../departments/entity';
import MediaFilesEntity from '../media/entity';
import NavigationEntity from '../navigation/entity';
import ProductEntity from '../products/entity';
import SubcategoryEntity from '../subcategories/entity';
import VariantEntity from '../variants/entity';

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
  async loadBackup(_req: Request, res: Response) {
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
      const mediaRepository = AppDataSource.getRepository(MediaFilesEntity);



      for (const dataJson of jsonData) {

        let existingDepartment = await departmentRepository.findOne({ where: { department: dataJson.department } });

        if (!existingDepartment) {
          const newMedia = new MediaFilesEntity();
          existingDepartment = new DepartmentEntity();
          existingDepartment.department = dataJson.department
          existingDepartment.media = newMedia
          await departmentRepository.save(existingDepartment);
          await mediaRepository.save(newMedia)
        }

        let existingCategory = await categoryRepository.findOne({ where: { category: dataJson.category } });

        if (!existingCategory) {
          const newMedia = new MediaFilesEntity();
          existingCategory = new CategoryEntity();
          existingCategory.category = dataJson.category
          existingCategory.department = existingDepartment
          existingCategory.media = newMedia
          await categoryRepository.save(existingCategory)
          await mediaRepository.save(newMedia)
        }


        let existingSubcategory = await subcategoryRepository.findOne({ where: { subcategory: dataJson.subcategory } });

        if (!existingSubcategory) {
          const newMedia = new MediaFilesEntity();
          existingSubcategory = new SubcategoryEntity();
          existingSubcategory.subcategory = dataJson.subcategory
          existingSubcategory.category = existingCategory
          existingSubcategory.media = newMedia
          await subcategoryRepository.save(existingSubcategory)
          await mediaRepository.save(newMedia)
        }

        let existingProduct = await productRepository.findOne({ where: { product: dataJson.product } })

        if (!existingProduct) {
          const newMedia = new MediaFilesEntity();
          existingProduct = new ProductEntity();
          existingProduct.product = dataJson.product
          existingProduct.brand = dataJson.brand
          existingProduct.description = dataJson.description
          existingProduct.specifications = dataJson.specification
          existingProduct.benefits = dataJson.benefits
          existingProduct.contents = dataJson.contents
          existingProduct.warranty = dataJson.warranty

          existingProduct.subcategory = existingSubcategory
          existingProduct.media = newMedia
          await productRepository.save(existingProduct)
          await mediaRepository.save(newMedia)


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

          const newMedia = new MediaFilesEntity();

          const newVariant = new VariantEntity();
          newVariant.attributes = jstonVariant.attributes
          newVariant.images = jstonVariant.images
          newVariant.price = jstonVariant.price
          newVariant.stock = jstonVariant.stock
          newVariant.videos = jstonVariant.videos
          newVariant.product = existingProduct
          newVariant.media = newMedia

          // imagenes y videos
          newMedia.images = jstonVariant.images
          newMedia.videos = jstonVariant.videos
          await mediaRepository.save(newMedia)
          // 

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
      errorHandlerCatch({ error, res });
    }
  },
  async clearProduct(_req: Request, res: Response) {
    const currentDirectory = __dirname; // Obtén el directorio actual
    const parentDirectory = join(currentDirectory, '..', '..', 'core', 'db', 'ultimo.json'); // Obtén el directorio superior
    const jsonData: DataTotal[] = JSON.parse(readFileSync(parentDirectory, 'utf-8'));

    const result: DataTotal[] = jsonData.reduce((acc: DataTotal[], e) => {
      if (!e.productId || !e.productName || !e.brand || !e.department || !e.category || !e.subcategory || !e.description) return acc;
      if (acc.find((p) => p.productId === e.productId)) return acc;
      return [...acc, e];
    }, []);


    const data: Data[] = result.map(({ benefits, brand, category, contents, department, description, productName, specification, subcategory, variants, warranty }) => {
      return {
        product: productName,
        brand,
        description,
        contents,
        warranty,
        department,
        category,
        subcategory,
        benefits,
        specification,
        variants: variants.map(({ ListPrice, attributes, images, price, stock, videos }) => {
          return {
            attributes,
            images,
            ListPrice,
            listPrice: ListPrice,
            price,
            stock,
            videos
          }
        }),
      }
    })


    // const seenProductIds = new Set<string>();
    // const result: DataTotal[] = [];

    // jsonData.forEach((e) => {
    //   // if (e.productId && e.productName && e.brand && e.department && e.category && e.subcategory && e.description) {
    //     if (seenProductIds.has(e.productId)) {
    //       // Si el productId ya está en el conjunto, agrega el producto al resultado
    //       result.push(e);
    //     } else {
    //       // Si es la primera vez que encuentras este productId, agrégalo al conjunto
    //       seenProductIds.add(e.productId);
    //     // }
    //   }
    // });

    res.json({ data })
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
