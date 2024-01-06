import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RequestMapNavigation, RouteNavigation } from "../../services/navigationRequest";
import './style/filters.scss'; // Asegúrate de importar el archivo SCSS en tu componente

function Filters({ categories, subcategories, brand, attributes, specifications }: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['filters']) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAccordionToggle = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="filters">
      <div className="content">
        <div className="acordeon-item">
          <div className="acordeon-header" onClick={() => handleAccordionToggle('category')}>Category</div>
          <div className={`acordeon-content ${openAccordion === 'category' ? 'open' : ''}`}>
            <div className="category">
              {/* <label>Category:</label> */}
              {categories.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" id={`category-${index}`} value={item} />
                  <label htmlFor={`category-${index}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="acordeon-item">
          <div className="acordeon-header" onClick={() => handleAccordionToggle('subcategory')}>Subcategory</div>
          <div className={`acordeon-content ${openAccordion === 'subcategory' ? 'open' : ''}`}>
            <div className="subcategory">
              {/* <label>Subcategory:</label> */}
              {subcategories.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" id={`subcategory-${index}`} value={item} />
                  <label htmlFor={`subcategory-${index}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="acordeon-item">
          <div className="acordeon-header" onClick={() => handleAccordionToggle('brand')}>Brand</div>
          <div className={`acordeon-content ${openAccordion === 'brand' ? 'open' : ''}`}>
            <div className="brand">
              {/* <label>Brand:</label> */}
              {brand.map((item, index) => {
                const allSelectedBrands = searchParams.getAll('brand')
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`brand-${index}`}
                      value={item}
                      checked={allSelectedBrands.includes(item)}
                      onChange={() => {
                        const updatedBrands = [...allSelectedBrands];

                        // Si la marca ya está seleccionada, quitarla; de lo contrario, agregarla
                        if (updatedBrands.includes(item)) {
                          const index = updatedBrands.indexOf(item);
                          updatedBrands.splice(index, 1);
                        } else {
                          updatedBrands.push(item);
                        }

                        // Actualizar los parámetros de búsqueda
                        setSearchParams((prevSearchParams) => {
                          const newSearchParams = new URLSearchParams(prevSearchParams);
                          newSearchParams.delete('brand'); // Limpiar el parámetro existente

                          // Agregar las marcas seleccionadas al nuevo parámetro
                          updatedBrands.forEach((brand) => {
                            newSearchParams.append('brand', brand);
                          });

                          return newSearchParams;
                        });
                      }}
                    />
                    <label htmlFor={`brand-${index}`} className={allSelectedBrands.includes(item) ? 'checked' : ''}>
                      {item}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="acordeon-item">
          <div className="acordeon-header" onClick={() => handleAccordionToggle('attributes')}>Attributes</div>
          <div className={`acordeon-content ${openAccordion === 'attributes' ? 'open' : ''}`}>
            <div className="attributes">
              {Object.entries(attributes).map(([attribute, values], index) => (
                <div key={index}>
                  <label>{attribute}:</label>
                  {values.map((value, valueIndex) => (
                    <div key={valueIndex}>
                      <input type="checkbox" id={`${attribute}-${valueIndex}`} value={value} />
                      <label htmlFor={`${attribute}-${valueIndex}`}>{value}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="acordeon-item">
          <div className="acordeon-header" onClick={() => handleAccordionToggle('specifications')}>Specifications</div>
          <div className={`acordeon-content ${openAccordion === 'specifications' ? 'open' : ''}`}>
            <div className="specifications">
              {Object.entries(specifications).map(([specification, values], index) => (
                <div key={index}>
                  <label>{specification}:</label>
                  {values.map((value, valueIndex) => (
                    <div key={valueIndex}>
                      <input type="checkbox" id={`${specification}-${valueIndex}`} value={value} />
                      <label htmlFor={`${specification}-${valueIndex}`}>{value}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
