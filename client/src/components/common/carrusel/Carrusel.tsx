// src/Carrusel.tsx
import React, { useEffect, useState } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { IAdvertising } from '../../../interfaces/advertising.interface';
import { Link } from 'react-router-dom';
// import './principal.scss'; // Importa tu archivo de estilos

interface CarruselProps {
  advertising: IAdvertising.advertising[];
  itemPerPage?: number
}
const Carrusel: React.FC<CarruselProps> = ({ advertising, itemPerPage = 3 }) => {
  const { mediaQuery } = useMediaQuery();
  // Estado para controlar si el mouse está sobre la vitrina
  const [isMouseOverVitrine, setIsMouseOverVitrine] = useState(false);

  // Estado para almacenar todos los productos paginados
  const [allAdvertising, setAllAdvertising] = useState<(Pick<IAdvertising.advertising, 'advertising_id' | 'redirect' | 'title'> & { image: string })[][]>([]);

  // Estado para controlar el índice actual de los productos mostrados
  const [currentIndex, setCurrentIndex] = useState(0);

  // Número de productos por página
  const [advertisingPerPage, setAdvertisingPerPage] = useState<number>(1)
  // const advertisingPerPage = 1;

  // Número total de páginas
  const pageCount = Math.ceil(advertising.length / advertisingPerPage);


  useEffect(() => {
    setAdvertisingPerPage(mediaQuery === 'phone' ? 1 : itemPerPage);
     // eslint-disable-next-lin
  }, [mediaQuery, itemPerPage])


  // Efecto para actualizar los productos paginados cuando cambian los productos originales
  useEffect(() => {
    const adve = advertising.map(({ advertising_id, redirect, title, image_desktop, image_phone, image_tablet }) => {
      const resultImage = mediaQuery === 'phone' ? image_phone : mediaQuery === 'tablet' ? image_tablet : image_desktop
      const image = resultImage ? resultImage : image_desktop
      return {
        advertising_id,
        redirect,
        title,
        image
      }
    })
    setAllAdvertising(updateVisibleAdvertising({ allAdvertising: adve, advertisingPerPage, pageCount }));
    // eslint-disable-next-line
  }, [advertising, mediaQuery, advertisingPerPage]);

  // Efecto para cambiar automáticamente el índice de la vitrina cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMouseOverVitrine && allAdvertising.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allAdvertising.length);
      }
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonta o cuando isMouseOverVitrine cambia
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isMouseOverVitrine, allAdvertising]);

  // Renderizar el componente principal
  return (
    <div
      className="advertising"
      onMouseEnter={() => setIsMouseOverVitrine(true)}
      onMouseLeave={() => setIsMouseOverVitrine(false)}
    >
      {/* Botón para retroceder al producto anterior */}
      <button onClick={() => setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        // Si el nuevo índice es menor que cero, vuelve al final de la vitrina
        return newIndex < 0 ? allAdvertising.length - 1 : newIndex;
      })}>&lt;</button>

      {/* Mapear y renderizar los productos en la vitrina */}
      <div className='render_container' style={{ display: 'flex', gap: '1.5rem', width: '100%' }}>
        {allAdvertising[currentIndex]?.map((item, index) => {
          return (
            <Link key={index} to={item.redirect}>
              <img src={item.image} style={{ width: '100%', borderRadius: '0.5rem' }} alt="" />
            </Link>
          )
        })}
      </div>

      {/* Botón para avanzar al siguiente producto */}
      <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % allAdvertising.length)}>&gt;</button>
    </div>
  );
};

export default Carrusel;

// Función para actualizar los productos visibles en función de la paginación y el cambio de tamaño de la ventana
const updateVisibleAdvertising = ({ allAdvertising, advertisingPerPage, pageCount }: { allAdvertising: (Pick<IAdvertising.advertising, 'advertising_id' | 'redirect' | 'title'> & { image: string })[], advertisingPerPage: number, pageCount: number }) => {

  const paginatedAdvertising = Array.from({ length: pageCount }, (_, pageIndex) => {
    // Calcular los índices de inicio y fin de la página actual
    const startIndex = pageIndex * advertisingPerPage;
    const endIndex = advertisingPerPage * (pageIndex + 1);

    // Obtener los productos de la página actual
    const currentPageAdvertising = allAdvertising.slice(startIndex, endIndex);

    // Verificar si la página actual está completa
    if (currentPageAdvertising.length === advertisingPerPage) {
      return currentPageAdvertising;
    } else if (allAdvertising.length < advertisingPerPage) {
      // En caso de que haya menos productos que el tamaño de la página,
      // generar productos basados en los existentes, repitiéndolos si es necesario
      return Array.from({ length: advertisingPerPage }, (_, index) => {
        const foundProduct = allAdvertising.find(
          (_, i) => i === (0 + index) % allAdvertising.length
        );
        return foundProduct ? foundProduct : allAdvertising[0];
      });
    } else {
      // Calcular el índice del último producto de la página anterior
      const lastProductIndex = allAdvertising.indexOf(currentPageAdvertising[0]) - 2;
      const startRange = 0;
      const endIndexForRandom = lastProductIndex > 0 ? lastProductIndex : 0;

      // Crear un array de índices disponibles
      const availableIndexes = Array.from(
        { length: endIndexForRandom + 1 },
        (_, i) => i
      );

      // Generar números aleatorios no repetidos para completar la página
      const generatedNumbers = Array.from(
        { length: advertisingPerPage - currentPageAdvertising.length },
        () => {
          if (availableIndexes.length === 0) {
            // En caso de que no haya más índices disponibles, repetir el primer producto
            return allAdvertising[startRange];
          }

          // Elegir aleatoriamente de los índices disponibles
          const randomIndex = Math.floor(Math.random() * availableIndexes.length);
          const selectedIndex = availableIndexes[randomIndex];

          // Eliminar el índice seleccionado de los índices disponibles
          availableIndexes.splice(randomIndex, 1);

          return allAdvertising[selectedIndex];
        }
      );

      // Combinar los productos de la página actual con los generados aleatoriamente
      return [...currentPageAdvertising, ...generatedNumbers];
    }
  });

  return paginatedAdvertising;

};
