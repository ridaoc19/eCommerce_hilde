import { Dispatch, SetStateAction, useState } from "react";
import Button from "../../../../components/common/button/Button";
import Input from "../../../../components/common/Input/Input";
import Select from "../../../../components/common/Select/Select";
import Spinner from "../../../../components/common/spinner";
import { InitialStateProductCreation, UseProductCreationQueryReturn } from "./useProductCreationQuery";

const options = [
  { value: 'department', label: 'Departamento' },
  { value: 'category', label: 'Categoría' },
  { value: 'subcategory', label: 'Subcategoría' },
  { value: 'product', label: 'Producto' },
];

interface ProductCreationSearchProps {
  stateProductCreation: InitialStateProductCreation
  setStateProductCreation: Dispatch<SetStateAction<InitialStateProductCreation>>
  query: UseProductCreationQueryReturn['query']
}

function ProductCreationSearch({ stateProductCreation, setStateProductCreation, query }: ProductCreationSearchProps) {
  const [searchProductCreation, setSearchProductCreation] = useState('')

  return (
    <div className="product-creation-search">
      <div className="product-creation-search__container">
        <div className="product-creation-search__input">
          <Input input={{
            name: 'search',
            placeholder: 'ID o nombre',
            disabled: query.isLoading,
            value: searchProductCreation,
            handleOnChange: (event) => setSearchProductCreation(event.target.value),
          }}
            errorMessage=""
            styleClass=""
          />
        </div>
        <div className="product-creation-search__select">
          <Select
            options={options}
            disabled={query.isLoading}
            value={stateProductCreation.query.entity}
            onChange={(value) => {
              setStateProductCreation(prevState => ({
                ...prevState,
                query: { ...prevState.query, type: 'search', entity: value as InitialStateProductCreation['query']['entity'] }
              }))
            }} />
        </div>
        <div className="product-creation-search__button">
          <Button
            button={{
              type: 'dark',
              disabled: query.isLoading,
              text: query.isLoading ? <Spinner /> : 'Buscar',
              handleClick: () => setStateProductCreation(prevState => ({ ...prevState, query: { ...prevState.query, type: 'search', search: searchProductCreation } }))
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCreationSearch;
