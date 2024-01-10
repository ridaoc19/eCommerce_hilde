// src/Showcase.tsx
import React, { useEffect, useState } from 'react';
import './principal.scss'; // Importa tu archivo de estilos
import { IProduct } from '../../../interfaces/product.interface';
import Card from '../card/Card';

interface ShowcaseProps {
  products: IProduct.Product[];
}

const Showcase: React.FC<ShowcaseProps> = ({ products }) => {
  // Estado para controlar si el mouse está sobre la vitrina
  const [isMouseOverVitrine, setIsMouseOverVitrine] = useState(false);

  // Estado para almacenar todos los productos paginados
  const [allProducts, setAllProducts] = useState<IProduct.Product[][]>([]);

  // Estado para controlar el índice actual de los productos mostrados
  const [currentIndex, setCurrentIndex] = useState(0);

  // Número de productos por página
  const productsPerPage = 1;

  // Número total de páginas
  const pageCount = Math.ceil(products.length / productsPerPage);

  // Efecto para inicializar componentes al montar el componente
  useEffect(() => {
    // console.log(productos, "tiene")
  }, []);

  // Efecto para actualizar los productos paginados cuando cambian los productos originales
  useEffect(() => {
    setAllProducts(updateVisibleProducts2({ allProducts: products, productsPerPage, pageCount }));
  }, [products]);

  // Efecto para cambiar automáticamente el índice de la vitrina cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMouseOverVitrine && allProducts.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allProducts.length);
      }
    }, 3000);

    // Limpiar el intervalo cuando el componente se desmonta o cuando isMouseOverVitrine cambia
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isMouseOverVitrine, allProducts]);

  // Efecto para manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      // Lógica para manejar el cambio de tamaño de la ventana
    };

    // Agregar el evento de cambio de tamaño de la ventana y limpiarlo cuando el componente se desmonta
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, [currentIndex]);

  // Renderizar el componente principal
  return (
    <div
      className="vitrine"
      onMouseEnter={() => setIsMouseOverVitrine(true)}
      onMouseLeave={() => setIsMouseOverVitrine(false)}
    >
      {/* Botón para retroceder al producto anterior */}
      <button onClick={() => setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        // Si el nuevo índice es menor que cero, vuelve al final de la vitrina
        return newIndex < 0 ? allProducts.length - 1 : newIndex;
      })}>&lt;</button>

      {/* Mapear y renderizar los productos en la vitrina */}
      {allProducts[currentIndex]?.map((item, index) => {
        return (
          <Card
            key={index}
            product_id={item.product_id}
            brand={item.brand}
            images={item.variants[0].images}
            product={item.product}
            price={item.variants.map(e => e.price)} />
        )
      })}

      {/* Botón para avanzar al siguiente producto */}
      <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % allProducts.length)}>&gt;</button>
    </div>
  );
};

export default Showcase;

// Función para actualizar los productos visibles en función de la paginación y el cambio de tamaño de la ventana
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