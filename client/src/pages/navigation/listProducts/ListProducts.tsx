
import Card from "../../../components/common/card/Card";
import useListProduct from "../../../hooks/useListProduct/useListProduct";

function ListProducts() {
  const { Filters, BreadcrumbComponent, listProducts, PaginationButton, currentIndex, paginationTotal, totalProduct } = useListProduct()

  console.log(listProducts, "lista")
  return (
    <div className="list-product__container">
      <div className="list-product__breadcrumb">
        {BreadcrumbComponent}
        cargados: {listProducts.length}
        - posicion:{currentIndex}
        - paginacion Total: {paginationTotal}
        - Total Productos: {totalProduct}
        {PaginationButton}
        {/* <Breadcrumb /> */}
      </div>
      <div className="list-product__card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
        {Filters}
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