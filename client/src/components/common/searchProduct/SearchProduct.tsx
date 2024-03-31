import { useState } from "react";
import { ErrorNavigation, MakeNavigationRequestReturn, navigationRequest } from "../../../services/navigation/navigationApi";
import { RequestMapNavigation, RouteNavigation } from "../../../services/navigation/navigationRequest";
import Input from "../Input/Input";
import SearchCard from "./SearchCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import './search.scss';

function SearchProduct() {
  const [search, setSearch] = useState("");

  // const { data } = useQuery(
  //   ['search', search],
  //   async () => navigationRequest(RouteNavigation.NavigationSearch).options({ extensionRoute: `/${search}` }),
  //   {
  //     enabled: !!search,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     onError(err: ErrorNavigation) {
  //       return err;
  //     },
  //   }
  // );

  const { data } = useQuery<MakeNavigationRequestReturn & { data: RequestMapNavigation[RouteNavigation.NavigationSearch]['data'] }, ErrorNavigation>({
    queryKey: ['search', search],
    queryFn: async () => navigationRequest(RouteNavigation.NavigationSearch).options({ extensionRoute: `/${search}` }),
    enabled: !!search,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <div className="search" onMouseLeave={() => setSearch("")}>
      <div className="search-input">
        <Input input={{
          handleOnChange: (event) => { setSearch(event.target.value) },
          name: "search",
          value: search,
          placeholder: "Buscar en Hilde.com",
          type: 'text'
        }} errorMessage="" styleClass="header__search-input" svg={{ type: 'search', color: '#FFA451' }} />
      </div>
      {search && <div className="search-list">
        <div>
          {data?.data.listProduct.map(pro => {
            return (
              <SearchCard
                key={pro.product.product_id}
                listProduct={pro}
                // product_id={pro.product.product_id} 
                // product={pro.product.product} 
                // variants={pro.variants} 
                handleOnClick={() => setSearch("")} />
            )
          })}
        </div>
        <div className="search-view">
          <Link className="link" to={`/list-products/${search}`} onClick={() => setSearch("")}>Ver Todo</Link>
        </div>
      </div>}
    </div>
  );
}

export default SearchProduct;