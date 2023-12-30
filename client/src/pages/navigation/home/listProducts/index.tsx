import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { navigationRequest } from "../../../../services/navigationApi";
import { RouteNavigation } from "../../../../services/navigationRequest";
// import Breadcrumb from "../../../components/common/breadcrumb/Breadcrumb";
// import Card from "../../../components/common/card/Card";
// import useProductFilter from "../../../hooks/useProductFilter";
// import './listProducts.scss';

function ListProducts() {
  const { entity, id } = useParams();
  const { data, isLoading, isError } = useQuery(['myQueryKey', id], () => navigationRequest(RouteNavigation.NavigationListProduct).options({ paramId: `${entity}/${id}` }), {
    enabled: !!id, // Esto evita que se realice la solicitud si id es falsy (por ejemplo, en la primera renderización cuando aún no hay un id)
  });

  // const [productId, setProductId] = useState(id || "")
  // // const { findItemById } = useProductFilter();
  // // const { product } = useMemo(() => findItemById({ id: productId }), [productId, findItemById])

  // useEffect(() => {
  //   setProductId(id || "")
  // }, [id])


  console.log(data, isLoading, isError);

  return (
    <div className="list-product__container">
      <div className="list-product__breadcrumb">
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