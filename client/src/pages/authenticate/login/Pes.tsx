// import React, { useState } from 'react';

// // Define the interface
// interface MyComponentProps {
//   name: string;
//   age: number;
// }

// // Create the component
// const MyComponent: React.FC<MyComponentProps> = (props) => {
//   return (
//     <div>
//       <h1>Name: {props.name}</h1>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// };

// export default MyComponent;


// // import React from 'react';
// // import MyComponent from './MyComponent';

// const App: React.FC = () => {
//   return (
//     <div>
//       <MyComponent name="John Doe" age={25} />
//     </div>
//   );
// };

// // export default App;
// export interface MyInterface {
//   prop1: string;
//   prop2: number;
//   prop3: boolean;
// }




// const MyComponentf: React.FC = () => {
//   interface MyComponentState {
//     count: number;
//     message: string;
//   }

//   const initialState: MyComponentState = {
//     count: 0,
//     message: 'Hello',
//   };

//   const [state, setState] = React.useState<MyComponentState>(initialState);

//   const incrementCount = () => {
//     setState((prevState) => ({
//       ...prevState,
//       count: prevState.count + 1,
//     }));
//   };

//   return (
//     <div>
//       <p>Count: {state.count}</p>
//       <p>Message: {state.message}</p>
//       <button onClick={incrementCount}>Increment</button>
//     </div>
//   );
// };











// ÀRRAY DE OBJETOS

// import React, { useState } from 'react';

// const MyComponentL = () => {
//   const [items, setItems] = useState([
//     { id: 1, name: 'Item 1' },
//     { id: 2, name: 'Item 2' },
//     { id: 3, name: 'Item 3' }
//   ]);

//   const updateItem = (itemId, newName) => {
//     // Crea una nueva array con los objetos actualizados
//     const updatedItems = items.map(item => {
//       if (item.id === itemId) {
//         // Crea una nueva instancia del objeto con la propiedad 'name' actualizada
//         return { ...item, name: newName };
//       }
//       return item; // Mantén el objeto sin cambios
//     });

//     // Actualiza el estado con la nueva array de objetos
//     setItems(updatedItems);
//   };

//   return (
//     <div>
//       {items.map(item => (
//         <div key={item.id}>
//           <span>{item.name}</span>
//           <button onClick={() => updateItem(item.id, 'New Name')}>
//             Update
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };




//  cambiar estado de objetos

// const MyComponenft = () => {
//   const [formState, setFormState] = useState({
//     email: { change: "", message: "" },
//     password: { change: "", message: "" }
//   });

//   const handleChange = (field, value) => {
//     setFormState(prevState => ({
//       ...prevState,
//       [field]: { ...prevState[field], change: value }
//     }));
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={formState.email.change}
//         name='email'
//         onChange={e => handleChange(e)}
//       />
//       <input
//         type="password"
//         value={formState.password.change}
//         name='password'
//         onChange={e => handleChange(e)}
//       />
//     </div>
//   );
// };


// export default MyComponenft



import React, { useState } from 'react';

// interface FormState {
//   email: { change: string; message: string };
//   password: { change: string; message: string };
// }

const MyComponent: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: { change: '', message: '' },
    password: { change: '', message: '' }
  });

  interface FormState {
    [key: string]: { change: string; message: string };
  }

  const handleInputChange = (fieldName: keyof FormState, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        change: value
      }
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={formState.email.change}
        onChange={e => handleInputChange('email', e.target.value)}
      />
      <input
        type="text"
        value={formState.password.change}
        onChange={e => handleInputChange('password', e.target.value)}
      />
    </div>
  );
};

export default MyComponent;


// interface FormState {
//   [key: string]: { change: string; message: string };
// }

// const formState: FormState = {
//   email: { change: "", message: "" },
//   password: { change: "", message: "" }
// };

// const propertyKey = "email";
// const propertyValue = formState[propertyKey]; // Accediendo a una propiedad utilizando una cadena de texto como clave

// console.log(propertyValue);



const obj: { [key: string]: number } = {
  foo: 123,
  bar: 456
};

const propertyKey: string = "foo"; // Variable de tipo 'string' específica
const propertyValue = obj[propertyKey]; // Accediendo a una propiedad utilizando la variable de tipo 'string'

console.log(propertyValue);



  // const myObject = {
  //   prop1: 'Hello',
  //   prop2: 42,
  //   prop3: true,
  // };

  // type MyObjectValue = typeof myObject[keyof typeof myObject];

  // const myValue: MyObjectValue = myObject.prop1;