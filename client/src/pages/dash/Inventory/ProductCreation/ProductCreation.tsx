import { useMemo } from "react";
import ProductCreationForm from "../../../../components/common/ProductForm/ProductForm";
import ProductCreationList from "./ProductCreationList";
import ProductCreationSearch from "./ProductCreationSearch";
import useProductCreationQuery from "./useProductCreationQuery";
import { initialStateForm } from "./utils";


function ProductCreation() {
  // const { mediaQuery } = useMediaQuery();
  const { setStateProductCreation, stateProductCreation, query, Breadcrumb } = useProductCreationQuery();
  const { mutation: { entity, paramId, route } } = stateProductCreation;

  const productEdit = useMemo(() => {
    if (query.data && route.includes('edit') && entity) {
      const filters = query.data.filters[entity];
      if (Array.isArray(filters)) {
        for (const items of filters) {
          if (Object.values(items).includes(paramId)) {
            const res = Object.entries(items).reduce((acc: Record<string, any>, [key, value]) => {
              if (!key.includes('_id')) {
                acc[key] = value;
              }
              return acc;
            }, {});

            return { requestData: res }
          }
        }
      }
    }
    return initialStateForm[route];
    // eslint-disable-next-line
  }, [query.data, entity, paramId, route]);

  return (
    <div className="product-creation">
      <div className="product-creation__search" style={{ display: 'flex' }}>
        <ProductCreationSearch stateProductCreation={stateProductCreation} setStateProductCreation={setStateProductCreation} />
      </div>

      {Breadcrumb}
      <div className="product-creation__list" style={{ display: 'flex', maxHeight: '15rem', overflow: 'hidden' }}>
        {query.data && <ProductCreationList data={query.data} setStateProductCreation={setStateProductCreation} stateProductCreation={stateProductCreation} />}
      </div>

      <hr />

      <div className="product-creation__form">
        <h3>{entity}</h3>
        {!!entity && <ProductCreationForm route={stateProductCreation.mutation.route} options={{ ...productEdit, paramId }} />}
      </div>
    </div>
  );
}

export default ProductCreation;