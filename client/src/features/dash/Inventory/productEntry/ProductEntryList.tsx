import { ButtonName, ProductsListProps } from './interface.ProductEntry';

function ProductEntryList({ handleOnClick, handleOnChange, state }: ProductsListProps) {
  const { breadcrumb, data: { department, category, subcategory, product } } = state;


  return (
    <div>
      <div>
        {/* <button name='clear' value={''} onClick={handleClickFilter}>limpiar Filtros</button> */}
        <div className='product_entry_breadcrumb'>
          {breadcrumb.map((item, index) => (
            <span key={item._id}>
              <button name={ButtonName.FilterProduct} value={item._id} onClick={handleOnClick} className='button_link'>
                {item.name}
              </button >
              {index < breadcrumb.length - 1 && ' > '}
            </span>
          ))}
        </div>
        <div>
          <h2>Departamento</h2>
          <input type="text" name="department" value={state.changeList.department} onChange={handleOnChange} />
          {department.map(dep => {
            return (
              <div key={dep._id}>
                <button name={ButtonName.FilterProduct} onClick={handleOnClick} value={dep._id}>{dep.name}</button>
              </div>
            )
          })}
        </div>
        <div>
          <h2>Categoría</h2>
          <input type="text" name="category" value={state.changeList.category} onChange={handleOnChange} />
          {category.map(cat => {
            return (
              <div key={cat._id}>
                <button name={ButtonName.FilterProduct} onClick={handleOnClick} value={cat._id}>{cat.name}</button>
              </div>
            )
          })}
        </div>
        <div>
          <h2>Subcategoría</h2>
          <input type="text" name="subcategory" value={state.changeList.subcategory} onChange={handleOnChange} />
          {subcategory.map(sub => {
            return (
              <div key={sub._id}>
                <button name={ButtonName.FilterProduct} onClick={handleOnClick} value={sub._id}>{sub.name}</button>
              </div>
            )
          })}
        </div>
        <div>
          <h2>Productos</h2>
          <input type="text" name="product" value={state.changeList.product} onChange={handleOnChange} />
          {product.map(pro => {
            return (
              <div key={pro._id}>
                <button name={ButtonName.FilterOpenForm} onClick={(event) => {
                  handleOnClick(event)
                }} value={pro._id}>{pro.name}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductEntryList;
