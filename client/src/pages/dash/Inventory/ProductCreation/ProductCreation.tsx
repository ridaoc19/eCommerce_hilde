import Select from "../../../../components/common/Select/Select";
import { RouteProduct } from "../../../../services/product/productRequest";
import { Input, Svg } from "../../../auth/login";
import ProductCreationForm from "./ProductCreationForm";
import useProductCreationQuery, { InitialStateProductCreation } from "./useProductCreationQuery";

const options = [
  { value: 'department', label: 'Departamento' },
  { value: 'category', label: 'Categoría' },
  { value: 'subcategory', label: 'Subcategoría' },
  { value: 'product', label: 'Producto' },
];

function ProductCreation() {
  // const { mediaQuery } = useMediaQuery();
  const { setStateProductCreation, stateProductCreation, query } = useProductCreationQuery();

  return (
    <div className="product-creation">
      <div className="product-creation__search" style={{ display: 'flex' }}>
        <div>
          <Input input={{
            name: 'search',
            placeholder: 'id ó nombre',
            value: stateProductCreation.search.search,
            handleOnChange: (event) => setStateProductCreation(prevState => ({ ...prevState, search: { ...prevState.search, search: event.target.value }, type: 'search' })),
          }}
            errorMessage=""
            styleClass=""
          />
        </div>
        <div>
          {/* <h3>Selecciona una opción:</h3> */}
          <Select
            options={options}
            value={stateProductCreation.search.entity}
            onChange={(value) => setStateProductCreation(prevState => ({ ...prevState, search: { ...prevState.search, entity: value as InitialStateProductCreation['search']['entity'] }, type: 'search' }))} />
        </div>
      </div>

      <div className="product-creation__list" style={{ display: 'flex', maxHeight: '15rem', overflow: 'hidden' }}>
        {Object.entries(query.data?.filters || {}).map(([key, value], index) => (
          <div key={index} className="contenedor">
            <div className="titulo">
              <h3>{key}</h3>
              {key === 'department' && <div>{<button onClick={() => { }}>{Svg({ type: "increase", width: 16, height: 16 })}</button>}</div>}
            </div>
            <div className="contenido" style={{ overflow: 'auto', height: '100%' }}>
              {value.map((item, ind) => (
                <div key={`${ind}abc`} style={{ display: 'flex' }}>
                  <p>{Object.values(item)[0]}</p>
                  <div>{<button onClick={() => { }}>{Svg({ type: "edit", width: 16, height: 16 })}</button>}</div>
                  <div>{<button onClick={() => { }}>{Svg({ type: "delete", width: 16, height: 16 })}</button>}</div>
                  {key !== 'product' && <div>{<button onClick={() => { }}>{Svg({ type: "increase", width: 16, height: 16 })}</button>}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


      <div className="product-creation__form">
        <h3>{stateProductCreation.mutation.entity}</h3>
        {/* {!!stateProductCreation.mutation.entity &&
          <>
            <Input input={{
              name: stateProductCreation.mutation.entity,
              placeholder: stateProductCreation.mutation.entity,
              value: stateProductCreation.mutation.input,
              handleOnChange: (event) => { setStateProductCreation(prevState => ({ ...prevState, mutation: { ...prevState.mutation, input: event.target.value } })) },
            }}
              errorMessage=""
              styleClass=""
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button button={{ type: 'dark', text: 'Guardar', handleClick: () => { } }} />
              <Button button={{ type: 'light', text: 'Limpiar', handleClick: () => { } }} />
            </div>
          </>
        } */}
        <ProductCreationForm route={RouteProduct.ProductCreate} options={{ requestData: { benefits: [], brand: "", contents: "", description: "", product: "", specifications: {}, warranty: "" }, paramId: "" }} />
      </div>
    </div>
  );
}

export default ProductCreation;