import { useEffect } from "react"
import useAdminImages from "../../hooks/useAdminImages/useAdminImages"

function Ensayo() {
  const { ModalAdminImages, selectedFiles } = useAdminImages({ location: 'ensayo', entity: 'variant' })

  const handleClick = () => {
    fetch('data.json')
      .then(res => res.json())
      .then((data: DataPrimary[]) => {
        const filterNull = data.filter(item => {
          if (!item.productId) return
          return item
        })
        const productIdSet = new Set<string>();
        const filterRepeat = filterNull.filter(item => {
          if (productIdSet.has(item.productId)) {
            return false; // Si ya existe el productId, no lo agregamos al filtro
          } else {
            productIdSet.add(item.productId);
            return true; // Si no existe, lo agregamos al filtro
          }
        });

        const filterNullTotal = filterRepeat.filter(item => {
          if (item.variants.some(e => !e.images) || !item.productId || !item.brand || !item.category || !item.subcategory || !item.productName) return
          return item
        })

        const imaDownload = filterNullTotal.flatMap(item => item.variants).flatMap(({ itemId, images }) => { return { images, itemId } })

        const reorganizeData: Data[] = filterNullTotal.map(({ productId, productName, brand, benefits, category, contents, department, description, specification, subcategory, variants, warranty }) => {
          return {
            productId,
            product: productName,
            brand,
            benefits,
            category,
            contents,
            department,
            description,
            specification,
            subcategory,
            variants: variants.map(({ itemId, attributes, images, ListPrice, price, stock, videos }) => {
              return {
                itemId,
                attributes,
                images,
                // images: images.map(img => img.replace('https://elektra.vteximg.com.br/arquivos/ids', 'https://server.ridaoc.es/file')),
                listPrice: ListPrice,
                price,
                stock,
                videos
              }
            }),
            warranty
          }
        })


        console.log({ reorganizeData, imaDownload });
      })
      .catch(err => console.log(err))
  }

  const handleBack = () => {
    fetch('http://localhost:8004/files/search')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles])

  return (
    <div>
      <button onClick={handleClick} >Cargar</button>
      <button onClick={handleBack} >Ultima lista buenas de productos JSON</button>
      <hr />
      {ModalAdminImages}
    </div>
  );
}

export default Ensayo;

interface DataPrimary {
  specification: Specification;
  productId: string;
  productName: string
  brand: string;
  department: string;
  category: string;
  subcategory: string;
  description: string;
  benefits: string[];
  contents: string;
  warranty: string;
  variants: VariantPrimary[];
}


interface VariantPrimary {
  itemId: string
  images: string[];
  attributes: Attributes;
  videos: string[];
  price: number;
  stock: number;
  ListPrice: number;
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


export interface Data {
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