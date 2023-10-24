import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductFilter from "../../../hooks/useProductFilter";

function Breadcrumb() {
  const { id } = useParams();
  const navigator = useNavigate();

  // const [productId, setProductId] = useState(id || "")
  const { findItemById } = useProductFilter();
  const { breadcrumb } = useMemo(() => findItemById({ id: id || "" }), [id])

  const handleOnclick = ({ _id }: { _id: string }) => {
    
    const type = findItemById({ id: _id }).type
    console.log(_id, type);
    if (type === 'products All') return navigator(`/`)
    if (type === 'product') return navigator(`/product-detail/${_id}`)
    navigator(`/list-products/${_id}`)
  }

  return (
    <div>
      {breadcrumb.map((item, index) => (
        <span key={item._id}>
          <button onClick={() => handleOnclick({ _id: item._id })} className='button_link'>
            {item.name}
          </button >
          {index < breadcrumb.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;