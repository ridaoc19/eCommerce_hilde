import React from 'react';
import { RouteProduct } from '../../../../services/productRequest';
import { HandleClick, Spinner, UserInput } from '../../../auth/login';
import Breadcrumb from './Breadcrumb';
import useStateProductCreation, { ButtonName, InitialState, NestedData, initialState } from './useStateProductCreation';
import { IProduct } from '../../../../interfaces/product.interface';


const ProductCreation: React.FC = () => {
  const { state, setState, handleOnChange, findItemById, status, tools } = useStateProductCreation();

  const handleOnClick: HandleClick = async (event) => {
    event.preventDefault();
    const { name, value, dataset } = event.target as HTMLButtonElement;
    const valueKey = value as keyof InitialState['changeList']
    setState(prevState => ({ ...prevState, select: initialState.select, data: prevState.intactData, changeList: initialState.changeList }))

    // const responseError = getValidationErrors({ fieldName: 'name', value: selectedCategory.requestData.name })
    switch (name) {
      case ButtonName.Clean:
        setState(initialState);
        break;

      case ButtonName.Save:
        switch (valueKey) {
          case 'department':
            tools.fetch(RouteProduct.DepartmentCreate).options({ requestData: { name: state.changeList[valueKey].department } })
            break;
          case 'category':
            tools.fetch(RouteProduct.CategoryCreate).options({ requestData: { name: state.changeList[valueKey].category }, paramId: state.changeList.department._id })
            break
          case 'subcategory':
            tools.fetch(RouteProduct.SubCategoryCreate).options({ requestData: { name: state.changeList[valueKey].subcategory }, paramId: state.changeList.category._id })
            break
          default:
            // tools.fetch(RouteProduct.ProductCreate).options({ requestData: { name: state.changeList[valueKey].input }, , paramId: state.changeList.subcategory._id })
            break;
        }
        setState(initialState)
        return;

      case ButtonName.EditUpdate:
        const id = dataset._id!
        const name = dataset.name!

        const resChangeList = Object.entries(state.changeList).reduce((acc, [key]) => {
          if (key === valueKey) {
            return {
              ...acc, [key]: valueKey !== 'product' ? { _id: id, [valueKey]: name } :
                { _id: id, [valueKey]: name }
            }
          } else
            return { ...acc, [key]: { _id: "", [valueKey]: "" } }
        }, {})

        setState((prevState) => ({ ...prevState, changeList: resChangeList as InitialState['changeList'], select: { ...prevState.select, [valueKey]: 'edit' } }));
        return

      case ButtonName.Edit:
        switch (valueKey) {
          case 'department':
            tools.fetch(RouteProduct.DepartmentEdit).options({ requestData: { name: state.changeList[valueKey].department }, paramId: state.changeList[valueKey]._id })
            break;
          case 'category':
            tools.fetch(RouteProduct.CategoryEdit).options({ requestData: { name: state.changeList[valueKey].category }, paramId: state.changeList[valueKey]._id })
            break
          case 'subcategory':
            tools.fetch(RouteProduct.SubCategoryEdit).options({ requestData: { name: state.changeList[valueKey].subcategory }, paramId: state.changeList[valueKey]._id })
            break
          default:
            // tools.fetch(RouteProduct.ProductEdit).options({ requestData: { name: state.changeList[valueKey].input }, , paramId: state.changeList[valueKey]._id })
            break;
        }
        setState(initialState)
        return

      case ButtonName.Delete:
        const _id = dataset._id!
        switch (valueKey) {
          case 'department':
            tools.fetch(RouteProduct.DepartmentDelete).options({ paramId: _id })
            break;
          case 'category':
            tools.fetch(RouteProduct.CategoryDelete).options({ paramId: _id })
            break
          case 'subcategory':
            tools.fetch(RouteProduct.SubCategoryDelete).options({ paramId: _id })
            break
          default:
            // tools.fetch(RouteProduct.ProductDelete).options({ paramId: _id })
            break;
        }
        // setState(initialState)
        return

      case ButtonName.FilterProduct:
        setState(prevState => ({ ...prevState, _id: value, selectedProduct: { ...prevState.selectedProduct, productId: "" } }))
        return

      case ButtonName.FilterOpenForm:
        setState(prevState => ({ ...prevState, _id: value, selectedProduct: { ...prevState.selectedProduct, productId: value, requestData: findItemById({ id: value }).product } }))
        return

      default:
        break;

    }
    // setState(emptyCategory({ category, state }))
  };



  return (
    <div className={`section-list__container`}>
      <Breadcrumb state={state} handleOnClick={handleOnClick} />

      {Object.entries(state.data).map(([name, _valueData], index) => {
        const nameKey = name as keyof NestedData
        const title = nameKey === 'department' ? 'Departamentos' : nameKey === 'category' ? 'Categorías' : nameKey === 'subcategory' ? 'Subcategorías' : 'Productos'
        const placeholder = nameKey === 'department' ? 'Tecnología' : nameKey === 'category' ? 'Televisores' : nameKey === 'subcategory' ? 'Smart TV' : 'Samsung L500'
        const stateChangeListValue = Object.fromEntries(Object.entries(state.changeList[nameKey]).filter(([keys]) => keys === nameKey))

        return (
          <div key={index} className={`section-list__box product-entry-${nameKey}`}>
            <div className="section-list__content">

              <div className="section-list__title">
                <h2>{title}</h2>
                {state.select[nameKey] === 'create' &&
                  <button name={ButtonName.Save} value={nameKey} className='button_dark' onClick={handleOnClick}>{status.isLoadingProduct ? <Spinner /> : `Agregar ${title}`}</button>
                }
                {state.select[nameKey] === 'edit' &&
                  <button name={ButtonName.Edit} value={nameKey} disabled={Array.isArray(state.data[nameKey])
                    ? (state.data[nameKey] as IProduct.Department[]).find((e) => e._id === state.changeList[nameKey]._id)?.name === stateChangeListValue[nameKey]
                    : false} className='button_dark' onClick={handleOnClick}>{status.isLoadingProduct ? <Spinner /> : `Actualizar ${title}`}</button>
                }
              </div>

              <div className="section-list__search">
                {!state.breadcrumb.some(item => item.name_id.includes(nameKey)) && <UserInput
                  input={{ name, handleOnChange, placeholder, value: stateChangeListValue[nameKey] as string || "" }}
                  styleClass='product-creation-input'
                  errorMessage=''
                />}
                {true && nameKey === 'product' &&
                  <div className='form-product-important-todo'>
                    <div className='name'>
                      <input type="text" name='name' placeholder='Nombre' value={state.selectedProduct.requestData.name} onChange={handleOnChange} />
                      {/* {validationError.name && <div>{validationError.name}</div>} */}
                    </div>

                    <div className='brand'>
                      <input type="text" name='brand' placeholder='Marca' value={state.selectedProduct.requestData.brand} onChange={handleOnChange} />
                      {/* {validationError.brand && <div>{validationError.brand}</div>} */}
                    </div>

                    <div className='description'>
                      <input type="text" name='description' placeholder='Descripción' value={state.selectedProduct.requestData.description} onChange={handleOnChange} />
                      {/* {validationError.description && <div>{validationError.description}</div>} */}
                    </div>

                    <div className='specification'>
                      {state.selectedProduct.requestData.specification.map((spec, index) => {

                        return (
                          <div key={index}>
                            <input
                              type="text"
                              name="specificationKey"
                              placeholder="clave"
                              data-index={index}
                              value={spec.key}
                              onChange={handleOnChange}
                            />
                            {/* {validationError.specificationKey && <span>{validationError.specificationKey}</span>} */}
                            <input
                              type="text"
                              name="specificationValue"
                              placeholder="valor"
                              data-index={index}
                              value={spec.value}
                              onChange={handleOnChange}
                            />
                            {/* {validationError.specificationValue && <span>{validationError.specificationValue}</span>} */}
                            <button
                              // disabled={isLoading}
                              // name={ButtonName.RemoveSpecification}
                              data-index={index}
                              onClick={handleOnClick}
                            >
                              Eliminar
                            </button>
                          </div>
                        )
                      })}
                      {/* {validationError.specification && <span>{validationError.specification}</span>} */}
                      {/* <button disabled={isLoading} name={ButtonName.AddSpecification} onClick={handleOnClick}>Agregar especificación</button> */}
                    </div>

                    <div className='images'>
                      <input id={`input__images-`} multiple className='input__images' type='file' name='images' onChange={handleOnChange} />
                      {state.temporaryImages.get.map((image, index) => (
                        <div key={index}>
                          <img src={URL.createObjectURL(image)} width={200} alt={`${index}`} />
                          {/* <button disabled={isLoading} name={ButtonName.FileDelete} data-type={'file'} value={index} onClick={handleOnClick}>Eliminar Imagen</button> */}
                        </div>
                      ))}
                      {state.selectedProduct.requestData.images.map((image, index) => (
                        <div key={index}>
                          <img src={`${process.env.REACT_APP_SERVER_FILE}/${image}`} width={200} alt={`${index}`} />
                          {/* <button disabled={isLoading} name={ButtonName.FileDelete} data-type={'url'} value={index} onClick={handleOnClick}>Eliminar Imagen</button> */}
                        </div>
                      ))}
                    </div>
                    {/* {validationError.images && <span>{validationError.images}</span>} */}
                  </div>

                }
              </div>

              <div className="section-list__list">
                {state.data[nameKey].map(({ _id, name }) => {
                  return (
                    <div key={_id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button
                        name={nameKey === 'product' ? ButtonName.FilterOpenForm : ButtonName.FilterProduct}
                        onClick={handleOnClick}
                        value={_id}
                      >
                        {name}
                      </button>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button name={ButtonName.EditUpdate} value={nameKey} data-_id={_id} data-name={name} onClick={handleOnClick}>Edit</button>
                        <button name={ButtonName.Delete} value={nameKey} data-_id={_id} onClick={handleOnClick}>{'Delete'}</button>
                      </div>
                    </div>
                  )
                })}
              </div>


            </div>
          </div>
        )
      })}
    </div>
  );
};

export default ProductCreation;
