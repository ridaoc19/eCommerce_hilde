// import Form from './Form';
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { productsGet } from "../../../redux/reducers/product/actions";
import Department from "./department";
import Category from "./category";
import Subcategory from "./subCategory";
// import CrudForm from './department/ejemplo';

function Inventory() {
  const dispatchRedux = useAppDispatch();

  useEffect(() => {
    dispatchRedux(productsGet({
      routes: "request",
      _id: "",
      subcategoryId: "",
      name: "",
      price: "",
      specification: [],
      description: "",
      images: [],
    }));
  }, []);

  return (
    <div>
      <div className="department">
        <h2>Departamento</h2>
        <Department />
      </div>
      <Category />
      <Subcategory />
      {/* <CrudForm /> */}

      {/* <Form /> */}
    </div>
  );
}

export default Inventory;
// const { change, handleOnChange, handleErrorOnBack, handleFileChange } = useOnChange(initialState)
// const stringRepetido = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio neque numquam vitae quis deleniti, earum corrupti tenetur autem iste nemo soluta sint animi fugit possimus iure voluptates veniam illum tempora.";
// // Crear un array con 20 elementos (pueden ser valores arbitrarios, como null)
// const arrayRepetido = Array.from({ length: 20 });
// // Utilizar map() para asignar el string a cada elemento del array
// const arrayConStringsRepetidos = arrayRepetido.map((_, index) => (
//   <div key={index}>{stringRepetido}</div>

// ));
