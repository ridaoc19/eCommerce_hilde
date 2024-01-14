import { useState } from "react";
import { useQuery } from "react-query";
import { ErrorNavigation, navigationRequest } from "../../../services/navigation/navigationApi";
import { RouteNavigation } from "../../../services/navigation/navigationRequest";
import Input from "../Input/Input";
import SearchCard from "./SearchCard";
import { Link } from "react-router-dom";
// import './search.scss';

function Search() {
  const [search, setSearch] = useState("");

  const { data } = useQuery(
    ['search', search],
    async () => navigationRequest(RouteNavigation.NavigationSearch).options({ extensionRoute: `/${search}` }),
    {
      enabled: !!search,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onError(err: ErrorNavigation) {
        return err;
      },
    }
  );

  // console.log({ data, isLoading, isError, error, isSuccess, isFetching });


  return (
    <div className="search">
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

export default Search;