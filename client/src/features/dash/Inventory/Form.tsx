// frontend/src/components/ImageUploader.tsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const ImageUploader: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedImage) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append('images', selectedImage, "ricardo.png");

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_URL_API}/images/registre`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       // Aquí podrías hacer algo con la URL de la imagen devuelta por el servidor.
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload Image</button>
//     </div>
//   );
// };

// export default ImageUploader;



// frontend/src/components/Form.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  images: File[];
  department: string;
  category: string;
  subcategory: string;
  price: string;
  specification: { key: string; value: string }[];
  description: string;
}

const initialState: FormData = {
  images: [],
  department: '',
  category: '',
  subcategory: '',
  price: '',
  specification: [],
  description: '',
};

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;

    if (inputName === 'images') {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFormData((prevData) => ({ ...prevData, images: [...prevData.images, files[0]] }));
      }

    } else if (inputName === 'specificationKey' || inputName === 'specificationValue') {
      const specIndex = parseInt(e.target.dataset.index || '0', 10);
      const specField = inputName === 'specificationKey' ? 'key' : 'value';
      const updatedSpecification = [...formData.specification];
      updatedSpecification[specIndex] = { ...updatedSpecification[specIndex], [specField]: e.target.value };
      setFormData((prevData) => ({ ...prevData, specification: updatedSpecification }));

    } else {
      setFormData((prevData) => ({ ...prevData, [inputName]: e.target.value }));
    }
  };

  const handleAddSpecification = () => {
    setFormData((prevData) => ({ ...prevData, specification: [...prevData.specification, { key: '', value: '' }] }));
  };

  const handleUpload = async () => {
    if (!formData.images.length) {
      return;
    }

    const form = new FormData();
    formData.images.forEach((image, _index) => {
      form.append(`images`, image);  // Usar el mismo nombre
    });
    form.append('department', formData.department);
    form.append('category', formData.category);
    form.append('subcategory', formData.subcategory);
    form.append('price', formData.price);

    formData.specification.forEach((spec, index) => {
      form.append(`specification[${index}][key]`, spec.key);
      form.append(`specification[${index}][value]`, spec.value);
    });

    form.append('description', formData.description);


    try {
      // console.log(form.getAll("images"));
      const response = await axios.post(`${process.env.REACT_APP_URL_API}/product/registre`,
        form, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // Aquí podrías manejar el error, mostrar un mensaje de error, etc.
    }
  };

  return (
    <div>
      <input type="file" name="images" onChange={handleFileChange} />
      <input type="file" name="images" onChange={handleFileChange} />
      <input type="file" name="images" onChange={handleFileChange} />
      {/* <input
        type="text"
        name="department"
        placeholder="departamento"
        onChange={handleFileChange}
      />
      <input
        type="text"
        name="category"
        placeholder="categoria"
        onChange={handleFileChange}
      />
      <input
        type="text"
        name="subcategory"
        placeholder="subcategoria"
        onChange={handleFileChange}
      /> */}
      <input
        type="text"
        name="price"
        placeholder="precio"
        onChange={handleFileChange}
      />
      {formData.specification.map((spec, index) => (
        <div key={index}>
          <input
            type="text"
            name="specificationKey"
            placeholder="clave"
            data-index={index}
            value={spec.key}
            onChange={handleFileChange}
          />
          <input
            type="text"
            name="specificationValue"
            placeholder="valor"
            data-index={index}
            value={spec.value}
            onChange={handleFileChange}
          />
        </div>
      ))}
      <button onClick={handleAddSpecification}>Agregar especificación</button>

      <input
        type="text"
        name="description"
        placeholder="descripción"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload Data</button>
      {formData.images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          width={200}
          alt={`${index}`}
        />
      ))}
    </div>
  );
};

export default Form;
