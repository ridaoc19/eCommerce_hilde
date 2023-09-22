import { useState } from 'react';
import useProductFilter from "../../../../hooks/useProductFilter";
import ProductEntryFormRender from "./ProductEntryFormRender";
import { IProduct } from '../../../../interfaces/product.interface';

function ProductEntryForm({ state }: { state: string }) {
  const { findItemById } = useProductFilter()
  const { product } = findItemById({ id: state })

  // Estado para las variantes
  const [variants, setVariants] = useState<IProduct.Variants[]>(product.variants);
  const [currentVariant, setCurrentVariant] = useState<IProduct.Variants | null>(null);

  // Estado para nuevos valores de variante
  const [newVariant, setNewVariant] = useState<IProduct.Variants>({
    size: '',
    color: '',
    purchasePrice: 0,
    sellingPrice: 0,
    stock: 0,
  });

  // Función para agregar una nueva variante
  const addVariant = () => {
    if ( newVariant.purchasePrice >= 0 && newVariant.sellingPrice >= 0 && newVariant.stock >= 0) {
      // if (newVariant.size && newVariant.color && newVariant.purchasePrice >= 0 && newVariant.sellingPrice >= 0 && newVariant.stock >= 0) {
      setVariants([...variants, newVariant]);
      setNewVariant({
        size: '',
        color: '',
        purchasePrice: 0,
        sellingPrice: 0,
        stock: 0,
      });
    }
  };

  // Función para editar una variante existente
  const editVariant = () => {
    if (currentVariant) {
      const updatedVariants = variants.map((variant) =>
        variant === currentVariant ? newVariant : variant
      );
      setVariants(updatedVariants);
      setCurrentVariant(null);
    }
  };

  // Función para eliminar una variante existente
  const deleteVariant = () => {
    if (currentVariant) {
      const updatedVariants = variants.filter((variant) =>
        variant !== currentVariant
      );
      setVariants(updatedVariants);
      setCurrentVariant(null);
    }
  };

  return (
    <div>
      <ProductEntryFormRender product={product}>
        <div className='images'>
          {product.images?.map((img, ind) => (
            <div key={ind}><img src={`${process.env.REACT_APP_SERVER_FILE}/${img}`} alt={ind.toString()} width={'200'} /></div>
          ))}
        </div>
        <div className="variants">
          <i>Variantes:</i>
          {variants.map((variant, index) => (
            <div key={index}>
              <span
                style={{ backgroundColor: variant.color }}
                onClick={() => setCurrentVariant(variant)}
              >
                {variant.size}
              </span>
              <span>
                {variant.purchasePrice} {variant.sellingPrice} {variant.stock}
              </span>
            </div>
          ))}
        </div>

        {/* Formulario de edición de variante */}
        {currentVariant && (
          <div className="edit-variant">
            <h3>Editar Variante</h3>
            <input
              type="text"
              placeholder="Tamaño"
              value={newVariant.size}
              onChange={(e) =>
                setNewVariant({ ...newVariant, size: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Color"
              value={newVariant.color}
              onChange={(e) =>
                setNewVariant({ ...newVariant, color: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Precio de compra"
              value={newVariant.purchasePrice}
              onChange={(e) =>
                setNewVariant({ ...newVariant, purchasePrice: e.target.valueAsNumber })
              }
            />
            <input
              type="number"
              placeholder="Precio de venta"
              value={newVariant.sellingPrice}
              onChange={(e) =>
                setNewVariant({ ...newVariant, sellingPrice: e.target.valueAsNumber })
              }
            />
            <input
              type="number"
              placeholder="Stock"
              value={newVariant.stock}
              onChange={(e) =>
                setNewVariant({ ...newVariant, stock: e.target.valueAsNumber })
              }
            />
            <button onClick={editVariant}>Guardar Cambios</button>
            <button onClick={deleteVariant}>Eliminar Variante</button>
          </div>
        )}

        {/* Formulario para agregar nueva variante */}
        <div className="add-variant">
          <h3>Agregar Variante</h3>
          <input
            type="text"
            placeholder="Tamaño"
            value={newVariant.size}
            onChange={(e) =>
              setNewVariant({ ...newVariant, size: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Color"
            value={newVariant.color}
            onChange={(e) =>
              setNewVariant({ ...newVariant, color: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio de compra"
            value={newVariant.purchasePrice}
            onChange={(e) =>
              setNewVariant({ ...newVariant, purchasePrice: e.target.valueAsNumber })
            }
          />
          <input
            type="number"
            placeholder="Precio de venta"
            value={newVariant.sellingPrice}
            onChange={(e) =>
              setNewVariant({ ...newVariant, sellingPrice: e.target.valueAsNumber })
            }
          />
          <input
            type="number"
            placeholder="Stock"
            value={newVariant.stock}
            onChange={(e) =>
              setNewVariant({ ...newVariant, stock: e.target.valueAsNumber })
            }
          />
          <button onClick={addVariant}>Agregar Variante</button>
        </div>
      </ProductEntryFormRender>
    </div>
  );
}

export default ProductEntryForm;
