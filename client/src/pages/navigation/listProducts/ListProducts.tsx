
import Card from "../../../components/common/card/Card";
import useListProduct from "../../../hooks/useListProduct/useListProduct";
import useMediaQuery from "../../../hooks/useMediaQuery";

function ListProducts() {
  const { mediaQuery } = useMediaQuery()
  const { BreadcrumbComponent, listProducts, currentIndex, paginationTotal, totalProduct } = useListProduct()

  return (
    <div className="list-product__container">
      <div className="list-product__breadcrumb">
        {BreadcrumbComponent}
        cargados: {listProducts.length}
        - posicion:{currentIndex}
        - paginacion Total: {paginationTotal}
        - Total Productos: {totalProduct}
        {/* {PaginationButton} */}
        {/* <Breadcrumb /> */}
      </div>
      <div className="list-product__card"
        style={{
          // display: 'flex', 
          // flexWrap: 'wrap',
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(9rem, ${mediaQuery === 'phone' ? '9rem' : mediaQuery === 'tablet' ? '15rem' : '20rem'}))`,
          justifyContent: 'space-evenly',
          //  justifyContent: 'space-between',
          gap: '0.5rem'
        }}
      >
        {/* {Filters} */}
        {listProducts.map(({ product: { product_id, product, brand }, variants }) => {
          return (
            <Card key={product_id} product_id={product_id} product={product} brand={brand} images={variants[0].images} price={variants.map(variant => variant.price)} />
          )
        })}


      </div>
    </div>
  );
}

export default ListProducts;