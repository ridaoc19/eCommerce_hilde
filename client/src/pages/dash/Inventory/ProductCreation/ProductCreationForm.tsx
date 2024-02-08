import { ChangeEvent, useState } from 'react';
import { RequestMapProduct, RouteProduct } from '../../../../services/product/productRequest';
import useMutationProduct from '../../../../services/product/useMutationProduct';
import { HandleClick } from '../../../auth/login';

function ProductCreationForm<T extends RouteProduct>({ route, options }: { route: T, options: Omit<RequestMapProduct[T], 'route' | 'data'> }) {
  const { executeProductMutation } = useMutationProduct();

  // Estado para almacenar los datos del formulario
  const [requestData, setRequestData] = useState('requestData' in options ? options.requestData : null);

  // Estado para manejar los campos de tipo objeto
  const [objectKey, setObjectKey] = useState<string>("");
  const [objectValue, setObjectValue] = useState<string>("");
  const [array, setArray] = useState<string>("")

  // Función para manejar cambios en los campos de texto
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequestData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit: HandleClick = (e) => {
    e.preventDefault();
    // Agregar los campos de objeto al estado de datos del formulario
    if (requestData) {
      setRequestData((prevState: any) => ({
        ...prevState,
        // ...object
      }));
    }
    // Ejecutar la mutación con los datos del formulario
    executeProductMutation({ route, options: { ...options, requestData } });
  };

  return (
    <form >
      {/* Renderizar campos de entrada */}
      {!!requestData &&
        Object.entries(requestData).map(([name, value], index) => {
          if (typeof value === 'object' && !Array.isArray(value)) {
            // Renderizar campos de objeto

            return (
              <div key={index} className='specification'>
                <div className='list'>
                  {Object.entries(value).map(([key, val], ind) => (
                    <div key={ind} style={{ display: 'flex' }}>
                      <h4>{key}</h4>: <p>{val as string}</p>

                      <button type="button" onClick={() => {
                        setRequestData((prevData: { [x: string]: { [x: string]: string; }; }) => {
                          const updatedData = Object.keys(prevData).reduce((acc, curr) => {
                            if (curr !== name) {
                              acc[curr] = prevData[curr];
                            } else {
                              const filteredValue = Object.keys(prevData[curr]).reduce((acc2, curr2) => {
                                if (curr2 !== key) {
                                  acc2[curr2] = prevData[curr][curr2];
                                }
                                return acc2;
                              }, {} as Record<string, string>);
                              acc[curr] = filteredValue;
                            }
                            return acc;
                          }, {} as Record<string, Record<string, string>>);
                          return updatedData;
                        });
                      }}>Eliminar</button>

                    </div>
                  ))}
                </div>
                {/* Campos de entrada para agregar nuevos datos al objeto */}
                <div>
                  <input
                    type="text"
                    name="specificationKey"
                    placeholder="clave"
                    value={objectKey}
                    onChange={(event) => setObjectKey(event.target.value)}
                  />
                  <input
                    type="text"
                    name="specificationValue"
                    placeholder="valor"
                    value={objectValue}
                    onChange={(event) => setObjectValue(event.target.value)}
                  />
                </div>
                <button
                  disabled={false}
                  name={`add`}
                  onClick={(e) => {
                    e.preventDefault()
                    setRequestData({ ...requestData, [name]: { ...value, ...{ [objectKey]: objectValue } } })
                    setObjectKey("")
                    setObjectValue("")
                  }}>Agregar {name}</button>
              </div>
            );
          } else if (Array.isArray(value)) {
            return (
              <div key={index}>
                <ul className='list'>
                  {value.map((item, i) => {
                    return (
                      <div key={i}>
                        <li key={i}>{item}</li>
                        <button onClick={(e) => {
                          e.preventDefault();
                          setRequestData((prevData: { [x: string]: any[]; }) => ({
                            ...prevData,
                            [name]: prevData[name].filter((_, index) => index !== i)
                          }));
                        }}>Eliminar</button>
                      </div>
                    )
                  })}
                </ul>

                <input
                  type="text"
                  name={'array'}
                  placeholder={name}
                  value={array}
                  onChange={(event) => setArray(event.target.value)}
                />
                <button
                  disabled={false}
                  name={`add`}
                  onClick={(e) => {
                    e.preventDefault()
                    setRequestData({ ...requestData, [name]: [...value, array] })
                    setArray("")
                  }}>Agregar {name}</button>
              </div>
            )
          } else {
            // Renderizar campos de texto
            return (
              <div key={index}>
                <input
                  type="text"
                  name={name}
                  placeholder={name}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            );
          }
        })}
      {/* Botón de envío del formulario */}
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

export default ProductCreationForm;
