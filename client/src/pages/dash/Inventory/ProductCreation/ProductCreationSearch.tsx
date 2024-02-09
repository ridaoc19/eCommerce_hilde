import { Dispatch, SetStateAction } from "react";
import { Input } from "../../../auth/login";
import { InitialStateProductCreation } from "./useProductCreationQuery";
import Select from "../../../../components/common/Select/Select";

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
    </>
  );
}

export default ProductCreationSearch;