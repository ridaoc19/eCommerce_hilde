import { useEffect, useState } from "react";
import useProductFilter from "../../hooks/useProductFilter";
import { IProduct } from "../../interfaces/product.interface";

function Home() {
  const { findItemById, isFetching } = useProductFilter();
  const [department, setDepartment] = useState<IProduct.Department[]>([])

  useEffect(() => {
    if (!isFetching) {
      setDepartment(findItemById({ id: "" }).department.data)
    }
    // eslint-disable-next-line
  }, [isFetching])



  return (
    <div>
      {isFetching ? (
        <div>Cargando productos</div>
      ) : (
        <div>
          {department.map(({ _id, name, categoriesId }) => (
            <div key={_id}>
              <h2>{name}</h2>
              {categoriesId.map(({ subcategoriesId }) => {
                return subcategoriesId.map(({ productsId }) => {
                  return productsId.map(({ _id, brand, description, images, name, specification, variants }) => {
                    return (
                      <div key={_id}>
                        <img src={`${process.env.REACT_APP_SERVER_FILE}/${images[0]}`} width={100} alt="" />
                        <h3>{name}</h3>
                        <h4>{brand}</h4>
                        <ul>
                          {variants.map((item, index) => (
                            <div key={index}>
                              <li><div style={{ width: 20, height: 20, backgroundColor: item.color }}></div></li>
                              <li>{item.purchasePrice}</li>
                              <li>{item.sellingPrice}</li>
                              <li>{item.size}</li>
                              <li>{item.stock}</li>
                            </div>
                          ))}
                        </ul>
                        <p>{description}</p>
                        <ul>
                          {specification.map((item, index) => <li key={index}>{item.key}: {item.value}</li>)}
                        </ul>
                      </div>
                    )
                  })
                })
              })}
              <hr />

            </div>
          ))
          }
        </div>
      )}
    </div>
  );
}

export default Home;
