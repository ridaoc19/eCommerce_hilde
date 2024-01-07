import useListProduct from "../../../hooks/useListProduct/useListProduct";

function ProductDetail() {
  const { BreadcrumbComponent, listProducts } = useListProduct()

  listProducts.length > 0 && console.log(listProducts)

  return (
    <div>
      {listProducts.length > 0 &&
        <div>
          <div className="detail__breadcrumb">
            {BreadcrumbComponent}
          </div>
          <div>
            <div className="title">
              <h2>{listProducts[0].product.product}</h2>
            </div>
            <div className="marca">
              <p>{listProducts[0].product.brand}</p>
            </div>
            <div className="images" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {listProducts[0].product.variants.map(e => {
                return e.images.map((img, i) => (
                  <div key={i}>
                    <img src={img} alt="" width={100} />
                  </div>
                ))
              })}
            </div>
            <div className="price">
            </div>
            <div className="description">
              <p>{listProducts[0].product.description}</p>
            </div>
            <div className="specification">
              {Object.entries(listProducts[0].product.specifications).map(([key, value], index) => {
                return (
                  <div key={index}>
                    <div ><span>{key}: </span><span>{value}</span></div>
                  </div>
                )
              })}
            </div>
            <div className="showcase">
              {/* {similarProducts.length > 0 && <Showcase title="Productos similares" cardData={similarProducts} />} */}
            </div>
          </div>
        </div>}
    </div>
  );
}

export default ProductDetail;