import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RequestMapNavigation, RouteNavigation } from "../../services/navigation/navigationRequest";

function Filters({ filters }: { filters: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['filters'] }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAccordionToggle = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };
  // Esta función se memoizará y no se recreará en cada renderizado
  const devAllSelectedBrands = useCallback((itemKey: string) => {
    return searchParams.getAll(itemKey)
  }, [searchParams]); // La función se memoizará solo si 'searchParams' cambia

  return (
    <div className="filters">
      <div className="filters__content">
        {Object.entries(filters).map(([title, value], index) => {
          if (Array.isArray(value)) {
            if (value.length === 0) return null
            return (
              <div key={index} className="filters__accordion-item">
                <div className="filters__accordion-header" onClick={() => handleAccordionToggle(title)}>
                  {title}
                </div>
                <div className={`filters__accordion-content ${openAccordion === title ? 'filters__accordion-content--open' : ''}`}>
                  <div className={`filters__${title} filters__items`}>
                    {/* <label>Brand:</label> */}
                    {value.map((item, index) => {
                      const allSelectedBrands = searchParams.getAll(title)
                      return (
                        <div key={index} className={`filters__checked-container ${allSelectedBrands.includes(item) ? 'filters__checked-container--selected' : ''}`}>
                          <input
                            type="checkbox"
                            id={`${title}-${index}`}
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
                                newSearchParams.delete(title); // Limpiar el parámetro existente

                                // Agregar las marcas seleccionadas al nuevo parámetro
                                updatedBrands.forEach((brand) => {
                                  newSearchParams.append(title, brand);
                                });

                                return newSearchParams;
                              });
                            }}
                          />
                          <label htmlFor={`${title}-${index}`} className={allSelectedBrands.includes(item) ? 'filters__checked' : ''}>
                            {item}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          } else {
            return Object.entries(value).map(([itemKey, itemValue], itemIndex) => {
              if (itemValue.length === 0) return null
              return (
                <div key={itemIndex} className="filters__accordion-item">
                  <div className="filters__accordion-header" onClick={() => handleAccordionToggle(itemKey)}>
                    {itemKey}
                  </div>
                  <div className={`filters__accordion-content ${openAccordion === itemKey ? 'filters__accordion-content--open' : ''}`}>
                    <div className={`filters__${itemKey} filters__items`}>
                      {/* <label>Brand:</label> */}
                      {itemValue.map((item, index) => {
                        const allSelectedBrands = devAllSelectedBrands(itemKey)
                        // const allSelectedBrands = searchParams.getAll(itemKey)
                        return (
                          <div key={index} className={`filters__checked-container ${allSelectedBrands.includes(item) ? 'filters__checked-container--selected' : ''}`}>
                            <input
                              type="checkbox"
                              id={`${itemKey}-${index}`}
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
                                  newSearchParams.delete(itemKey); // Limpiar el parámetro existente

                                  // Agregar las marcas seleccionadas al nuevo parámetro
                                  updatedBrands.forEach((brand) => {
                                    newSearchParams.append(itemKey, brand);
                                  });

                                  return newSearchParams;
                                });
                              }}
                            />
                            <label htmlFor={`${itemKey}-${index}`} className={allSelectedBrands.includes(item) ? 'filters__checked' : ''}>
                              {item}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })
          }
        })}
      </div>
    </div>
  );
}

export default Filters;
