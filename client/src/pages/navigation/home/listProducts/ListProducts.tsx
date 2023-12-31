// import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
// import Card from "../../../components/common/card/Card";
// import useProductFilter from "../../../hooks/useProductFilter";
// import './listProducts.scss';

import useListProduct from "../../../../hooks/useListProduct/useListProduct";

function ListProducts() {
  const { BreadcrumbComponent, error, isError, isLoading, listProduct } = useListProduct()
  // const { id } = useParams();
  // const { data, isLoading, isError } = useQuery(
  //   ['list-product', id], () => navigationRequest(RouteNavigation.NavigationListProduct).options({ extensionRoute: `?id=${id}&skip=${0}&take=${10}` }), {
  //   enabled: !!id, // Esto evita que se realice la solicitud si id es falsy (por ejemplo, en la primera renderización cuando aún no hay un id)
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  // });

  // const [productId, setProductId] = useState(id || "")
  // // const { findItemById } = useProductFilter();
  // // const { product } = useMemo(() => findItemById({ id: productId }), [productId, findItemById])

  // useEffect(() => {
  //   setProductId(id || "")
  // }, [id])


  console.log({listProduct, error, isLoading, isError});

  return (
    <div className="list-product__container">
      {/* <Breadcrumb breadcrumb={data?.data.breadcrumb} /> */}
      <div className="list-product__breadcrumb">
        {BreadcrumbComponent}
        {/* <Breadcrumb /> */}
      </div>
      <div className="list-product__card">
        {/* {product.data.map(({ _id, product, brand, images, variants }) => {
          return (
            <Card key={_id} _id={_id} product={product} brand={brand} images={images} price={variants.map(pri => pri.sellingPrice)} />
          )
        })} */}
      </div>
    </div>
  );
}

export default ListProducts;