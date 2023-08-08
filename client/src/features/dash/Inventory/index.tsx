// import Form from './Form';
import { useState } from 'react';
import Department from './department';

function Inventory() {
  const [] = useState("department")

  return <div>
    <Department />
    {/* <Form /> */}
  </div>;
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