import { useMemo, useState } from "react";
import useProductFilter from "../../../hooks/useProductFilter";
import { IProduct } from "../../../interfaces/product.interface";
import UserInput from "../userInput/UserInput";
import SearchCard from "./SearchCard";
// import './search.scss';

function Search() {
  const { findItemById } = useProductFilter();
  const totalProduct = useMemo(() => findItemById<IProduct.Department[]>({ id: "" }).product.data, [findItemById])
  const [search, setSearch] = useState("");

  return (
    <div className="search">
      <div className="search-input">
        <UserInput input={{
          handleOnChange: (event) => { setSearch(event.target.value) },
          name: "search",
          value: search,
          placeholder: "Buscar en Hilde.com",
          type: 'text'
        }} errorMessage="" styleClass="header__search-input" svg={{ type: 'search', color: '#FFA451' }} />
      </div>
      {search && <div className="search-list">
        <div>
          {totalProduct.filter(pro => pro.product.toLowerCase().includes(search.toLowerCase())).filter((_ext, index) => index < 20).map(pro => {
            return (
              <SearchCard key={pro._id} _id={pro._id} product={pro.product} images={pro.images} variants={pro.variants} handleOnClick={() => setSearch("")} />
            )
          })}
        </div>
      </div>}
    </div>
  );
}

export default Search;