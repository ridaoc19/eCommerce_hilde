import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RequestMapNavigation, RouteNavigation } from "../../services/navigation/navigationRequest";
import './style/filters.scss'; // Asegúrate de importar el archivo SCSS en tu componente

function Filters(filters: RequestMapNavigation[RouteNavigation.NavigationListProduct]['data']['filters']) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleAccordionToggle = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="filters">
      <div className="content">
        {Object.entries(filters).map(([title, value], index) => {
          if (Array.isArray(value)) {
            if (value.length === 0) return null
            return (
              <div key={index} className="acordeon-item">
                <div className="acordeon-header" onClick={() => handleAccordionToggle(title)}>{title}</div>
                <div className={`acordeon-content ${openAccordion === title ? 'open' : ''}`}>
                  <div className={`${title}`}>
                    {/* <label>Brand:</label> */}
                    {value.map((item, index) => {
                      const allSelectedBrands = searchParams.getAll(title)
                      return (
                        <div key={index}>
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
                          <label htmlFor={`${title}-${index}`} className={allSelectedBrands.includes(item) ? 'checked' : ''}>
                            {item}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              // <div key={index}>
              //   {`${key} : ${value}`}
              // </div>
            )
          } else {
            return Object.entries(value).map(([itemKey, itemValue], itemIndex) => {
            if (itemValue.length === 0) return null
              return (
                <div key={itemIndex} className="acordeon-item">
                  <div className="acordeon-header" onClick={() => handleAccordionToggle(itemKey)}>{itemKey}</div>
                  <div className={`acordeon-content ${openAccordion === itemKey ? 'open' : ''}`}>
                    <div className={`${itemKey}`}>
                      {/* <label>Brand:</label> */}
                      {itemValue.map((item, index) => {
                        const allSelectedBrands = searchParams.getAll(itemKey)
                        return (
                          <div key={index}>
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
                            <label htmlFor={`${itemKey}-${index}`} className={allSelectedBrands.includes(item) ? 'checked' : ''}>
                              {item}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                // <div key={index}>
                //   {`${key} : ${value}`}
                // </div>
              )
            })
          }

        })}




      </div>
    </div>
  );
}

export default Filters;


// {/* <div className="acordeon-item">
// <div className="acordeon-header" onClick={() => handleAccordionToggle('category')}>Category</div>
// <div className={`acordeon-content ${openAccordion === 'category' ? 'open' : ''}`}>
//   <div className="category">
//     {/* <label>Category:</label> */}
//     {categories.map((item, index) => (
//       <div key={index}>
//         <input type="checkbox" id={`category-${index}`} value={item} />
//         <label htmlFor={`category-${index}`}>{item}</label>
//       </div>
//     ))}
//   </div>
// </div>
// </div>
// <div className="acordeon-item">
// <div className="acordeon-header" onClick={() => handleAccordionToggle('subcategory')}>Subcategory</div>
// <div className={`acordeon-content ${openAccordion === 'subcategory' ? 'open' : ''}`}>
//   <div className="subcategory">
//     {/* <label>Subcategory:</label> */}
//     {subcategories.map((item, index) => (
//       <div key={index}>
//         <input type="checkbox" id={`subcategory-${index}`} value={item} />
//         <label htmlFor={`subcategory-${index}`}>{item}</label>
//       </div>
//     ))}
//   </div>
// </div>
// </div>
// <div className="acordeon-item">
// <div className="acordeon-header" onClick={() => handleAccordionToggle('brand')}>Brand</div>
// <div className={`acordeon-content ${openAccordion === 'brand' ? 'open' : ''}`}>
//   <div className="brand">
//     {/* <label>Brand:</label> */}
//     {brand.map((item, index) => {
//       const allSelectedBrands = searchParams.getAll('brand')
//       return (
//         <div key={index}>
//           <input
//             type="checkbox"
//             id={`brand-${index}`}
//             value={item}
//             checked={allSelectedBrands.includes(item)}
//             onChange={() => {
//               const updatedBrands = [...allSelectedBrands];

//               // Si la marca ya está seleccionada, quitarla; de lo contrario, agregarla
//               if (updatedBrands.includes(item)) {
//                 const index = updatedBrands.indexOf(item);
//                 updatedBrands.splice(index, 1);
//               } else {
//                 updatedBrands.push(item);
//               }

//               // Actualizar los parámetros de búsqueda
//               setSearchParams((prevSearchParams) => {
//                 const newSearchParams = new URLSearchParams(prevSearchParams);
//                 newSearchParams.delete('brand'); // Limpiar el parámetro existente

//                 // Agregar las marcas seleccionadas al nuevo parámetro
//                 updatedBrands.forEach((brand) => {
//                   newSearchParams.append('brand', brand);
//                 });

//                 return newSearchParams;
//               });
//             }}
//           />
//           <label htmlFor={`brand-${index}`} className={allSelectedBrands.includes(item) ? 'checked' : ''}>
//             {item}
//           </label>
//         </div>
//       )
//     })}
//   </div>
// </div>
// </div>
// {/* <div className="acordeon-item">
// <div className="acordeon-header" onClick={() => handleAccordionToggle('attributes')}>Attributes</div>
// <div className={`acordeon-content ${openAccordion === 'attributes' ? 'open' : ''}`}>
//   <div className="attributes"> */}
// {Object.entries(attributes).map(([attribute, values], index) => {
// return (
//   <div className="acordeon-item">
//     <div className="acordeon-header" onClick={() => handleAccordionToggle(attribute)}>{attribute}</div>
//     <div className={`acordeon-content ${openAccordion === attribute ? 'open' : ''}`}>
//       <div className="attributes">
//         <div key={index}>
//           {/* <label>{attribute}:</label> */}
//           {values.map((value, valueIndex) => (
//             <div key={valueIndex}>
//               <input type="checkbox" id={`${attribute}-${valueIndex}`} value={value} />
//               <label htmlFor={`${attribute}-${valueIndex}`}>{value}</label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// )
// })}
// {/* </div> */}
// {/* </div> */}
// {/* </div> */}
// {/* <div className="acordeon-item">
// <div className="acordeon-header" onClick={() => handleAccordionToggle('specifications')}>Specifications</div>
// <div className={`acordeon-content ${openAccordion === 'specifications' ? 'open' : ''}`}>
//   <div className="specifications"> */}
// {Object.entries(specifications).map(([specification, values], index) => (
// <div className="acordeon-item">
//   <div className="acordeon-header" onClick={() => handleAccordionToggle(specification)}>{specification}</div>
//   <div className={`acordeon-content ${openAccordion === specification ? 'open' : ''}`}>
//     <div className="specifications">
//       <div key={index}>
//         {/* <label>{specification}:</label> */}
//         {values.map((value, valueIndex) => (
//           <div key={valueIndex}>
//             <input type="checkbox" id={`${specification}-${valueIndex}`} value={value} />
//             <label htmlFor={`${specification}-${valueIndex}`}>{value}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// </div>
// ))}
// </div>
// </div>
// //     </div> */}