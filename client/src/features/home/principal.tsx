// src/App.tsx
import React, { useEffect, useState } from 'react';
import './principal.scss';
import { IProduct } from '../../interfaces/product.interface';
import Card from '../../components/common/card/Card';
import productos from '../../utils/db';


interface AppProps {
  products: IProduct.Product[];
}

const App: React.FC<AppProps> = ({ products }) => {
  const [isMouseOverVitrine, setIsMouseOverVitrine] = useState(false);
  const [allProducts, setAllProducts] = useState<IProduct.Product[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const productsPerPage = 1;
  const pageCount = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    console.log(productos, "tiene")
  }, [])

  useEffect(() => {
    setAllProducts(updateVisibleProducts2({ allProducts: products, productsPerPage, pageCount }))
  }, [products])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMouseOverVitrine && allProducts.length > 0) {
        // console.log(allProducts, "ensayo")
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allProducts.length);
      }
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isMouseOverVitrine, allProducts]);

  useEffect(() => {
    const handleResize = () => {

    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, [currentIndex]);

  return (
    <div
      className="vitrine"
      onMouseEnter={() => setIsMouseOverVitrine(true)}
      onMouseLeave={() => setIsMouseOverVitrine(false)}
    >
      <button onClick={() => setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        // Si el nuevo índice es menor que cero, vuelve al final de la vitrina
        return newIndex < 0 ? allProducts.length - 1 : newIndex;
      })}>&lt;</button>
      {allProducts[currentIndex]?.map((item, index) => {
        return (
          <Card
            key={index}
            _id={item._id}
            brand={item.brand}
            images={item.images}
            product={item.product}
            price={item.variants.map(e => e.sellingPrice)} />
        )
      })}
      {/* {visibleProducts.map((product, index) => (
        <div key={index} className="product">
          {product.name}
        </div>
      ))} */}
      <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % allProducts.length)}>&gt;</button>
    </div>
  );
};

export default App;

const updateVisibleProducts2 = ({ allProducts, productsPerPage, pageCount }: { allProducts: IProduct.Product[], productsPerPage: number, pageCount: number }) => {

  const paginatedProducts = Array.from({ length: pageCount }, (_, pageIndex) => {
    // Calcular los índices de inicio y fin de la página actual
    const startIndex = pageIndex * productsPerPage;
    const endIndex = productsPerPage * (pageIndex + 1);

    // Obtener los productos de la página actual
    const currentPageProducts = allProducts.slice(startIndex, endIndex);

    // Verificar si la página actual está completa
    if (currentPageProducts.length === productsPerPage) {
      return currentPageProducts;
    } else if (allProducts.length < productsPerPage) {
      // En caso de que haya menos productos que el tamaño de la página,
      // generar productos basados en los existentes, repitiéndolos si es necesario
      return Array.from({ length: productsPerPage }, (_, index) => {
        const foundProduct = allProducts.find(
          (_, i) => i === (0 + index) % allProducts.length
        );
        return foundProduct ? foundProduct : allProducts[0];
      });
    } else {
      // Calcular el índice del último producto de la página anterior
      const lastProductIndex = allProducts.indexOf(currentPageProducts[0]) - 2;
      const startRange = 0;
      const endIndexForRandom = lastProductIndex > 0 ? lastProductIndex : 0;

      // Crear un array de índices disponibles
      const availableIndexes = Array.from(
        { length: endIndexForRandom + 1 },
        (_, i) => i
      );

      // Generar números aleatorios no repetidos para completar la página
      const generatedNumbers = Array.from(
        { length: productsPerPage - currentPageProducts.length },
        () => {
          if (availableIndexes.length === 0) {
            // En caso de que no haya más índices disponibles, repetir el primer producto
            return allProducts[startRange];
          }

          // Elegir aleatoriamente de los índices disponibles
          const randomIndex = Math.floor(Math.random() * availableIndexes.length);
          const selectedIndex = availableIndexes[randomIndex];

          // Eliminar el índice seleccionado de los índices disponibles
          availableIndexes.splice(randomIndex, 1);

          return allProducts[selectedIndex];
        }
      );

      // Combinar los productos de la página actual con los generados aleatoriamente
      return [...currentPageProducts, ...generatedNumbers];
    }
  });

  return paginatedProducts;

};
