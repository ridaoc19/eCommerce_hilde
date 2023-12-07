import { StatusSection } from "../../../../hooks/useMutationProduct";
import { HandleChangeTextArea, HandleClick } from "../../../../interfaces/global.interface";
import { IProduct } from "../../../../interfaces/product.interface";
import { HandleChangeText, Spinner, UserInput } from "../../../auth/login";
import { ButtonName, InitialState } from "./helpers";

interface ProductFormProps {
  state: InitialState,
  name: string,
  status: StatusSection,
  handleOnChange: HandleChangeText,
  handleOnChangeTextArea: HandleChangeTextArea,
  handleOnChangeProduct: HandleChangeText,
  handleOnClick: HandleClick
}

function ProductForm({ state, name, status, handleOnChange, handleOnChangeProduct, handleOnChangeTextArea, handleOnClick }: ProductFormProps) {
  const nameKey = name as keyof InitialState['changeList']
  const placeholder = nameKey === 'department' ? 'Tecnología' : nameKey === 'category' ? 'Televisores' : nameKey === 'subcategory' ? 'Smart TV' : 'Samsung L500'
  const filterBreadcrumb = state.breadcrumb.map(e => e.name_id).at(-1)
  const validateButton = filterBreadcrumb === "" ? 'department' : filterBreadcrumb === "department" ? 'category' : filterBreadcrumb === 'category' ? 'subcategory' : 'product'
  const stateChangeListValue = Object.fromEntries(Object.entries(state.changeList[nameKey]).filter(([keys]) => keys === nameKey))
  const title = nameKey === 'department' ? 'Departamentos' : nameKey === 'category' ? 'Categorías' : nameKey === 'subcategory' ? 'Subcategorías' : 'Productos'

  return (
    <div className="section-list__search">

      <div className="button-save-edit">
        {state.select[nameKey] === 'create' &&
          <button name={ButtonName.Save} value={nameKey} className='button_dark' onClick={handleOnClick}>{status.isLoadingProduct ? <Spinner /> : `Agregar ${title}`}</button>
        }
        {state.select[nameKey] === 'edit' &&
          <button name={ButtonName.Edit} value={nameKey} disabled={Array.isArray(state.data[nameKey])
            ? (state.data[nameKey] as IProduct.Department[]).find((e) => e._id === state.changeList[nameKey]._id)?.department === stateChangeListValue[nameKey]
            : false} className='button_dark' onClick={handleOnClick}>{status.isLoadingProduct ? <Spinner /> : `Actualizar ${title}`}</button>
        }
      </div>
      {!state.breadcrumb.some(item => item.name_id.includes(nameKey)) && <UserInput
        input={{ type: name, name, handleOnChange, placeholder, value: stateChangeListValue[nameKey] as string || "" }}
        styleClass='product-creation-input'
        errorMessage={state.error[nameKey] || status.productError?.errors.find(e => e.field === name)?.message}
      />}
      {validateButton === 'product' && nameKey === 'product' && (state.select.product === 'create' || state.select.product === 'edit') &&

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
                  {(state.error.specificationKey) && <div>{state.error.specificationKey}</div>}
                  <input
                    type="text"
                    name="specificationValue"
                    placeholder="valor"
                    data-index={index}
                    value={spec.value}
                    onChange={handleOnChangeProduct}
                  />
                  {(state.error.specificationValue) && <div>{state.error.specificationValue}</div>}
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
  );
}

export default ProductForm;