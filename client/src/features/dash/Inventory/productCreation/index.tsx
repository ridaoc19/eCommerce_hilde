import React from 'react';
import { IProduct } from '../../../../interfaces/product.interface';
import { imagesAdmin } from '../../../../services/imagesApi';
import { RouteProduct } from '../../../../services/productRequest';
import { HandleClick, Spinner, UserInput } from '../../../auth/login';
import Breadcrumb from './Breadcrumb';
import useStateProductCreation, { ButtonName, InitialState, NestedData, initialState } from './useStateProductCreation';


const ProductCreation: React.FC = () => {
  const { state, setState, handleOnChangeTextArea, handleOnChange, handleOnChangeProduct, findItemById, status, tools } = useStateProductCreation();

  const handleOnClick: HandleClick = async (event) => {
    event.preventDefault();
    const { name, value, dataset } = event.target as HTMLButtonElement;
    const valueKey = value as keyof InitialState['changeList']

    // if (name !== ButtonName.FileDelete && name !== ButtonName.RemoveSpecification) {
    //   setState(prevState => ({ ...prevState, temporaryImages: initialState.temporaryImages, select: initialState.select, data: prevState.intactData, changeList: initialState.changeList }))
    tools.resetError()
    // }

    // const responseError = getValidationErrors({ fieldName: 'name', value: selectedCategory.requestData.name })
    switch (name) {
      case ButtonName.Clean:
        setState(initialState);
        break;

      case ButtonName.Save:
        switch (valueKey) {
          case 'department':
            tools.fetch(RouteProduct.DepartmentCreate).options({ requestData: { department: state.changeList[valueKey].department } })
            break;
          case 'category':
            tools.fetch(RouteProduct.CategoryCreate).options({ requestData: { category: state.changeList[valueKey].category }, paramId: state.changeList.department._id })
            break
          case 'subcategory':
            tools.fetch(RouteProduct.SubCategoryCreate).options({ requestData: { subcategory: state.changeList[valueKey].subcategory }, paramId: state.changeList.category._id })
            break
          case 'product':
            // valida images
            const totalImages = state.temporaryImages.get.length + state.changeList.product.images.length;
            if (totalImages === 0) setState(prevState => ({ ...prevState, error: { ...prevState.error, images: 'Debes subir al menos una imagen' } }))
            if (totalImages > 3) setState(prevState => ({ ...prevState, error: { ...prevState.error, images: 'No puedes subir más de tres imágenes' } }))

            if (totalImages === 0 || totalImages > 3) return
            // GUARDA
            const responseImages = await imagesAdmin({
              toRequest: {
                file: state.temporaryImages.get, name: state.changeList.product.product.toLowerCase() // Convertir a minúsculas
                  .replace(/[^\w\d]/g, '') // Eliminar caracteres no alfanuméricos (letras y números)
                  .normalize('NFD') // Normalizar para eliminar tildes
                  .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos (tildes)
              }
            })
            console.log(responseImages)
            tools.fetch(RouteProduct.ProductCreate).options({
              requestData: {
                product: state.changeList.product.product,
                brand: state.changeList.product.brand,
                description: state.changeList.product.description,
                specification: state.changeList.product.specification,
                images: responseImages
              },
              paramId: state.changeList.subcategory._id
            })
            break
          default:
            break;
        }
        // setState(initialState)
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

        setState({
          ...state, changeList: {
            ...state.changeList, [valueKey]: objectUpdate
          }, select: { ...state.select, [valueKey]: 'edit' }
        })
        return

      case ButtonName.Edit:
        switch (valueKey) {
          case 'department':
            tools.fetch(RouteProduct.DepartmentEdit).options({ requestData: { department: state.changeList[valueKey].department }, paramId: state.changeList[valueKey]._id })
            break;
          case 'category':
            tools.fetch(RouteProduct.CategoryEdit).options({ requestData: { category: state.changeList[valueKey].category }, paramId: state.changeList[valueKey]._id })
            break
          case 'subcategory':
            tools.fetch(RouteProduct.SubCategoryEdit).options({ requestData: { subcategory: state.changeList[valueKey].subcategory }, paramId: state.changeList[valueKey]._id })
            break

          case 'product':
            // valida images
            const totalImages = state.temporaryImages.get.length + state.changeList.product.images.length;
            if (totalImages === 0) setState(prevState => ({ ...prevState, error: { ...prevState.error, images: 'Debes subir al menos una imagen' } }))
            if (totalImages > 3) setState(prevState => ({ ...prevState, error: { ...prevState.error, images: 'No puedes subir más de tres imágenes' } }))

            if (totalImages === 0 || totalImages > 3) return
            // GUARDA
            // if (selectedProduct.productId) {
            if (state.temporaryImages.get.length > 0 || state.temporaryImages.delete.length > 0) {
              const responseImages = await imagesAdmin({
                toRequest: {
                  file: state.temporaryImages.get, name: state.changeList.product.product.toLowerCase() // Convertir a minúsculas
                    .replace(/[^\w\d]/g, '') // Eliminar caracteres no alfanuméricos (letras y números)
                    .normalize('NFD') // Normalizar para eliminar tildes
                    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos (tildes)
                }, toDelete: state.temporaryImages.delete
              })
              console.log(responseImages, "edit")
              tools.fetch(RouteProduct.ProductEdit).options({
                requestData: {
                  product: state.changeList.product.product,
                  brand: state.changeList.product.brand,
                  description: state.changeList.product.description,
                  specification: state.changeList.product.specification,
                  images: [...state.changeList.product.images, ...responseImages]
                },
                paramId: state.changeList.product._id
              })
            } else {
              tools.fetch(RouteProduct.ProductEdit).options({
                requestData: {
                  product: state.changeList.product.product,
                  brand: state.changeList.product.brand,
                  description: state.changeList.product.description,
                  specification: state.changeList.product.specification,
                  images: state.changeList.product.images
                },
                paramId: state.changeList.product._id
              })
            }
            // }
            break
          default:
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
          case 'product':
            tools.fetch(RouteProduct.ProductDelete).options({ paramId: _id })
            break
          default:
            break;
        }
        // setState(initialState)
        return

      case ButtonName.FilterProduct:
        setState(prevState => ({ ...prevState, _id: value, }))
        // setState(prevState => ({ ...prevState, _id: value, selectedProduct: { ...prevState.selectedProduct, productId: "" } }))
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
  };

  return (
    <div className={`section-list__container`}>
      <Breadcrumb state={state} handleOnClick={handleOnClick} />

      {status.productError?.errors.some(e => e.field === 'general') && <div className="form__error-back--content">
        {status.productError?.errors.some(e => e.field === 'general') &&
          <ul>
            {status.productError.errors.filter(e => e.field === 'general').map((e, i) => (
              <span key={i}>{e.message}</span>
            ))}
          </ul>
        }
      </div>}

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
                    ? (state.data[nameKey] as IProduct.Department[]).find((e) => e._id === state.changeList[nameKey]._id)?.department === stateChangeListValue[nameKey]
                    : false} className='button_dark' onClick={handleOnClick}>{status.isLoadingProduct ? <Spinner /> : `Actualizar ${title}`}</button>
                }
              </div>

              <div className="section-list__search">
                {!state.breadcrumb.some(item => item.name_id.includes(nameKey)) && <UserInput
                  input={{ type: name, name, handleOnChange, placeholder, value: stateChangeListValue[nameKey] as string || "" }}
                  styleClass='product-creation-input'
                  errorMessage={state.error[nameKey] || status.productError?.errors.find(e => e.field === name)?.message}
                // errorMessage={status.userError?.errors.find(e => e.field === item)?.message}
                />}
                {true && nameKey === 'product' &&
                  <div className='form-product-important-todo'>

                    <div className='brand-description'>
                      {(Object.keys(state.changeList.product).filter(key => ['brand'].includes(key)) as (keyof Pick<InitialState['changeList']['product'], 'brand'>)[]).map((name) => (
                        <UserInput
                          key={name}
                          // svg={{ type: name }}
                          styleClass={`product-creation__form--${name}`}
                          errorMessage={state.error[name] || status.productError?.errors.find(e => e.field === name)?.message}
                          input={{ type: "text", name, dataset_extra: name, placeholder: name === 'brand' ? 'Samsung' : 'Descripción del producto', value: state.changeList.product[name], handleOnChange: handleOnChangeProduct }}
                        />
                      ))}
                    </div>

                    <div className='description'>
                      <textarea name={'description'} value={state.changeList.product.description} onChange={handleOnChangeTextArea}
                        style={{ width: "100%", height: '3rem' }}
                      // cols={30} 
                      // rows={10}
                      >
                      </textarea>
                      {(state.error.description || (status.productError?.errors.find(e => e.field === 'description')?.message)) && <div>{state.error.description || status.productError?.errors.find(e => e.field === 'description')?.message}</div>}
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
                      {(state.error.specification || (status.productError?.errors.find(e => e.field === 'specification')?.message)) && <div>{state.error.specification || status.productError?.errors.find(e => e.field === 'specification')?.message}</div>}
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
                    {(
                      state.error.images ||
                      (status.productError?.errors.find(e => e.field === 'images')?.message)
                    ) && <div>{state.error.images || status.productError?.errors.find(e => e.field === 'images')?.message}</div>}
                  </div>

                }
              </div>
              <div className="section-list__list">
                {state.data[nameKey].map((item) => {
                  return (
                    <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button
                        name={ButtonName.FilterProduct}
                        // name={nameKey === 'product' ? ButtonName.FilterOpenForm : ButtonName.FilterProduct}
                        onClick={handleOnClick}
                        value={item._id}
                      >
                        {'department' in item ? item.department : 'category' in item ? item.category : 'subcategory' in item ? item.subcategory : 'product' in item ? item.product : ""}
                      </button>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button name={ButtonName.EditUpdate} value={nameKey} data-_id={item._id} data-name={name} onClick={handleOnClick}>Edit</button>
                        <button name={ButtonName.Delete} value={nameKey} data-_id={item._id} onClick={handleOnClick}>{'Delete'}</button>
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
