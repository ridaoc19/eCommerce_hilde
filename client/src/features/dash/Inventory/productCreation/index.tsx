import React from 'react';
import { IProduct } from '../../../../interfaces/product.interface';
import { RouteProduct } from '../../../../services/productRequest';
import { HandleClick, Spinner, UserInput } from '../../../auth/login';
import Breadcrumb from './Breadcrumb';
import useStateProductCreation, { ButtonName, InitialState, NestedData, initialState } from './useStateProductCreation';


const ProductCreation: React.FC = () => {
  const { state, setState, handleOnChange, handleOnChangeProduct, findItemById, status, tools } = useStateProductCreation();

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
        const id = dataset._id!;
        const changeListKey = Object.keys(initialState.changeList[valueKey]);
        const resultFound = Object.entries(findItemById({ id: id })[valueKey]);

        const objectUpdate = resultFound.reduce((acc, [key, value]) => {
          if (changeListKey.includes(key)) {
            return { ...acc, [key]: value };
          }
          return acc;
        }, {});

        setState({ ...state, changeList: { ...state.changeList, [valueKey]: objectUpdate }, select: { ...state.select, [valueKey]: 'edit' } })
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
        setState(prevState => ({ ...prevState, _id: value, }))
        // setState(prevState => ({ ...prevState, _id: value, selectedProduct: { ...prevState.selectedProduct, productId: "" } }))
        return

      case ButtonName.FilterOpenForm:
        console.log(findItemById({ id: value }).product)

        setState(prevState => ({ ...prevState, _id: value, selectedProduct: { ...prevState.selectedProduct, productId: value, requestData: findItemById({ id: value }).product } }))
        return

      case ButtonName.AddSpecification:
        setState({
          ...state, changeList: {
            ...state.changeList, product: {
              ...state.changeList.product, specification: [...state.changeList.product.specification, { key: '', value: '' }]
            }
          }
        })
        return;

      case ButtonName.RemoveSpecification:
        const { changeList: { product } } = state;
        const targetButton2 = event.target as HTMLElement;
        const specIndexToRemove = parseInt(targetButton2.dataset.index || '0', 10);
        const updatedSpecification = product.specification.filter((_, index) => index !== specIndexToRemove);
        setState(prevState => ({ ...prevState, changeList: { ...prevState.changeList, product: { ...prevState.changeList.product, specification: updatedSpecification } } }))
        return;

      case ButtonName.FileDelete:
        const { temporaryImages, changeList } = state;
        if (dataset.type === 'file') { // elimina files
          temporaryImages.get.splice(+value, 1)
          return setState({ ...state, temporaryImages })
        } else if (dataset.type === 'url') { //elimina string
          const urlDelete = changeList.product.images[+value]
          const filterImage = changeList.product.images.filter(img => img !== urlDelete)
          return setState({ ...state, temporaryImages: { ...state.temporaryImages, delete: [...state.temporaryImages.delete, urlDelete] }, changeList: { ...state.changeList, product: { ...state.changeList.product, images: filterImage } } })
        }
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
                  input={{ type: name, name, handleOnChange, placeholder, value: stateChangeListValue[nameKey] as string || "" }}
                  styleClass='product-creation-input'
                  errorMessage=''
                />}
                {true && nameKey === 'product' &&
                  <div className='form-product-important-todo'>

                    <div className='brand-description'>
                      {(Object.keys(state.changeList.product).filter(key => ['brand', 'description'].includes(key)) as (keyof Pick<InitialState['changeList']['product'], 'brand' | 'description'>)[]).map((name) => (
                        <UserInput
                          key={name}
                          // svg={{ type: name }}
                          styleClass={`product-creation__form--${name}`}
                          errorMessage={""}
                          input={{ type: "text", name, dataset_extra: name, placeholder: name === 'brand' ? 'Samsung' : 'Descripción del producto', value: state.changeList.product[name], handleOnChange: handleOnChangeProduct }}
                        />
                      ))}
                    </div>


                    <div className='specification'>
                      {state.changeList.product.specification.map((spec, index) => {
                        return (
                          <div key={index}>


                            <input
                              type="text"
                              name="specificationKey"
                              placeholder="clave"
                              data-index={index}
                              value={spec.key}
                              onChange={handleOnChangeProduct}
                            />
                            {/* {validationError.specificationKey && <span>{validationError.specificationKey}</span>} */}
                            <input
                              type="text"
                              name="specificationValue"
                              placeholder="valor"
                              data-index={index}
                              value={spec.value}
                              onChange={handleOnChangeProduct}
                            />
                            {/* {validationError.specificationValue && <span>{validationError.specificationValue}</span>} */}
                            <button
                              // disabled={isLoading}
                              name={ButtonName.RemoveSpecification}
                              data-index={index}
                              onClick={handleOnClick}
                            >
                              Eliminar
                            </button>
                          </div>
                        )
                      })}
                      <button disabled={false} name={ButtonName.AddSpecification} onClick={handleOnClick}>Agregar especificación</button>
                    </div>


                    <div className='images'>
                      <input id={`input__images-`} multiple className='input__images' type='file' name='images' onChange={handleOnChangeProduct} />
                      {state.temporaryImages.get.map((image, index) => (
                        <div key={index}>
                          <img src={URL.createObjectURL(image)} width={200} alt={`${index}`} />
                          <button disabled={false} name={ButtonName.FileDelete} data-type={'file'} value={index} onClick={handleOnClick}>Eliminar Imagen</button>
                        </div>
                      ))}
                      {state.changeList.product.images.map((image, index) => (
                        <div key={index}>
                          <img src={`${process.env.REACT_APP_SERVER_FILE}/${image}`} width={200} alt={`${index}`} />
                          <button disabled={false} name={ButtonName.FileDelete} data-type={'url'} value={index} onClick={handleOnClick}>Eliminar Imagen</button>
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
