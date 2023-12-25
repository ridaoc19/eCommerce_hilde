// src/App.tsx
import React, { useState, useEffect } from 'react';
import './principal.scss';

interface Product {
  id: number;
  name: string;
}

const products: Product[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
}));

const App: React.FC = () => {
  const [isMouseOverVitrine, setIsMouseOverVitrine] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateVisibleProducts = () => {
      const screenSize = window.innerWidth;
      let productsToShow: Product[] = [];
console.log(screenSize)
      if (screenSize < 768) {
        productsToShow = [products[currentIndex]];
      } else if (screenSize < 1024) {
        productsToShow = products.slice(currentIndex, currentIndex + 3);
      } else {
        productsToShow = products.slice(currentIndex, currentIndex + 6);
      }

      setVisibleProducts(productsToShow);
    };

    updateVisibleProducts();

    
    const handleResize = () => {
      updateVisibleProducts();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMouseOverVitrine) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isMouseOverVitrine]);


  return (
    <div
      className="vitrine"
      onMouseEnter={() => setIsMouseOverVitrine(true)}
      onMouseLeave={() => setIsMouseOverVitrine(false)}
    >
      <button onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}>&lt;</button>
      {visibleProducts.map((product) => (
        <div key={product.id} className="product">
          {product.name}
        </div>
      ))}
      <button onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)}>&gt;</button>
    </div>
  );
};

export default App;
