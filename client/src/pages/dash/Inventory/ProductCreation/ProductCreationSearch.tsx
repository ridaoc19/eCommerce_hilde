import { Dispatch, SetStateAction } from "react";
import Input from "../../../../components/common/Input/Input";
import Select from "../../../../components/common/Select/Select";
import { InitialStateProductCreation } from "./useProductCreationQuery";

interface ProductCreationSearchProps {
  stateProductCreation: InitialStateProductCreation
  setStateProductCreation: Dispatch<SetStateAction<InitialStateProductCreation>>
}

const options = [
  { value: 'department', label: 'Departamento' },
  { value: 'category', label: 'Categoría' },
  { value: 'subcategory', label: 'Subcategoría' },
  { value: 'product', label: 'Producto' },
];

function ProductCreationSearch({ stateProductCreation, setStateProductCreation }: ProductCreationSearchProps) {
  return (
    <>
      <div>
        <Input input={{
          name: 'search',
          placeholder: 'id ó nombre',
          value: stateProductCreation.query.search,
          handleOnChange: (event) => {
            setStateProductCreation(prevState => ({ ...prevState, query: { ...prevState.query, type: 'search', search: event.target.value } }))
          },
        }}
          errorMessage=""
          styleClass=""
        />
      </div>
      <div>
        {/* <h3>Selecciona una opción:</h3> */}
        <Select
          options={options}
          value={stateProductCreation.query.entity}
          onChange={(value) => {
            setStateProductCreation(prevState => ({
              ...prevState,
              query: { ...prevState.query, type: 'search', entity: value as InitialStateProductCreation['query']['entity'] }
            }))
          }} />
      </div>
    </>
  );
}

export default ProductCreationSearch;