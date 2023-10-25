import { useMemo, useState } from "react";
import useProductFilter from "../../../hooks/useProductFilter";
import { IProduct } from "../../../interfaces/product.interface";
import InputText from "../inputText/InputText";
import SearchCard from "./SearchCard";
import './search.scss';

function Search() {
  const { findItemById } = useProductFilter();
  const totalProduct = useMemo(() => findItemById<IProduct.Department[]>({ id: "" }).product.data, [findItemById])
  const [search, setSearch] = useState("");

  return (
    <div className="search-container">
      <div className="search-input">
        <InputText placeholder="Buscar en hilde.com" value={search} name="search" handleChange={(event) => setSearch(event.target.value)} />
      </div>
      {search && <div className="search-list">
        <div>
          {totalProduct.filter(pro => pro.name.toLowerCase().includes(search.toLowerCase())).filter((_ext, index) => index < 20).map(pro => {
            return (
              <SearchCard key={pro._id} _id={pro._id} name={pro.name} images={pro.images} variants={pro.variants} handleOnClick={() => setSearch("")} />
            )
          })}
        </div>
      </div>}
    </div>
  );
}

export default Search;