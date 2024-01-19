
import Card from "../../../components/common/card/Card";
import useListProduct from "../../../hooks/useListProduct/useListProduct";
import useMediaQuery from "../../../hooks/useMediaQuery";

function ListProducts() {
  const { BreadcrumbComponent, listProducts, Filters, PaginationButton, currentIndex, paginationTotal, totalProduct } = useListProduct()
  const { mediaQuery } = useMediaQuery()

  return (
    <div className="list-product__container">

      <div className={`list-product__filter`}>
        {Filters}
      </div>

      <div className="list-product__content">

        <header className="list-product__header">

          <div className="list-product__breadcrumb">
            {BreadcrumbComponent}
          </div>

          <div className="list-product__pagination">
            {PaginationButton}
          </div>

          <div className="list-product__totalizer">
            cargados: {listProducts.length} - posicion:{currentIndex} - paginacion Total: {paginationTotal} - Total Productos: {totalProduct}
          </div>

        </header>

        <main className={`list-product__card ${mediaQuery}`} >
          {/* {Filters} */}
          {listProducts.map(({ product: { product_id, product, brand }, variants }) => {
            return (
              <Card key={product_id} product_id={product_id} product={product} brand={brand} images={variants[0].images} price={variants.map(variant => variant.price)} />
            )
          })}
        </main>

        <footer className="list-product__footer">
          <div className="list-product__pagination">
            {PaginationButton}
          </div>
        </footer>
      </div>




    </div >
  );
}

export default ListProducts;