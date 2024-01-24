
import { useState } from "react";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import useListProduct from "../../../hooks/useListProduct/useListProduct";
import useMediaQuery from "../../../hooks/useMediaQuery";

function ListProducts() {
  const { listProducts, PaginationButton, BreadcrumbComponent, Filters, currentIndex, paginationTotal, setStateListProduct, totalProduct } = useListProduct()
  const { mediaQuery } = useMediaQuery()
  const [isButtonFilter, setIsButtonFilter] = useState(false)

  return (
    <div className="list-product">

      <div className={`list-product__filter ${mediaQuery} ${isButtonFilter ? "open" : "close"}`}>
        {Filters}
      </div>

      <div className="list-product__content">

        <header className="list-product__header">
          <div className="header__group">
            <div className="header__group-breadcrumb">
              {BreadcrumbComponent}
            </div>

            <div className="header__group-totalizer">
              Viendo {currentIndex} de {paginationTotal} páginas - {listProducts.length} de {totalProduct} productos
              {/* De un total de {totalProduct} Productos filtrados, estamos Mostrando {listProducts.length} productos, en la posición {currentIndex} de {paginationTotal} paginas */}
            </div>
          </div>

          {<div className="header__button">
            {/* {mediaQuery === 'phone' && <div className="header__button"> */}
            <Button button={{
              type: "light", text: "filtro flexible", handleClick: () => {
                setIsButtonFilter(true)
                setStateListProduct(prevState => ({ ...prevState, filterType: 'flexible' }))
              }
            }} />
            <Button button={{
              type: "light", text: "filtro estricto", handleClick: () => {
                setIsButtonFilter(true)
                setStateListProduct(prevState => ({ ...prevState, filterType: 'strict' }))
              }
            }} />
            <Button button={{ type: "light", text: "Orden", handleClick: () => { } }} />
            <div className={`header__button-close ${isButtonFilter ? "open" : "close"}`}>
              <Button button={{ type: "dark", text: "", handleClick: () => setIsButtonFilter(false) }} svgLeft={{ type: "close", color: 'white' }} />
            </div>
          </div>}

          <div className="header__pagination">
            {PaginationButton}
          </div>
        </header>

        <main className={`list-product__card ${mediaQuery}`} >
          {listProducts.map(({ product: { product_id, product, brand }, variants }) => {
            return (
              <Card key={product_id} product_id={product_id} product={product} brand={brand} images={variants[0].images} price={variants.map(variant => variant.price)} />
            )
          })}
        </main>

        <footer className="list-product__footer">
          <div className="footer__pagination">
            {PaginationButton}
          </div>
        </footer>
      </div>

    </div >
  );
}

export default ListProducts;