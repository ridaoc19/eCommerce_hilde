import { Dispatch, SetStateAction } from 'react';
import { HandleChangeText, HandleClick } from '../../interfaces/global.interface';
import './adminImages.scss';

interface ModalAdminImagesProps {
  files: File[],
  handleUploadImage: HandleChangeText,
  handleDeleteImage: HandleClick,
  handleSaveImages: HandleClick,
  isOpen: boolean,
  onClose: () => void,
  setModalOpen: Dispatch<SetStateAction<boolean>>
  allImages: { media: string, location: string }[]
}

function ModalAdminImages({ handleDeleteImage, setModalOpen, handleSaveImages, allImages, handleUploadImage, files, isOpen, onClose }: ModalAdminImagesProps) {


  return (
    <div>
      {/* Botón para abrir el modal */}
      <button onClick={() => setModalOpen(true)}>Administrar Imágenes</button>

      {/* Modal */}
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          {/* Contenido del modal (lista de imágenes, botones de carga y eliminación, etc.) */}
          <h2>Administrar Imágenes</h2>
          {/* <input type="file" onChange={(e) => handleUploadImage(e.target.files?.[0] || null)} /> */}

          <div className='container-images'>
            <ul>
              {allImages.map(({ media }) => (
                <img src={media} alt="" />
              ))}
            </ul>
          </div>

          <input id={`input__images-`} multiple className='input__images' type='file' name='images' onChange={handleUploadImage} />
          {files.map((image, index) => (
            <div key={index}>
              <img src={URL.createObjectURL(image)} width={200} alt={`${index}`} />
              <button value={index} onClick={handleDeleteImage}>Eliminar Imagen</button>
            </div>
          ))}
          <button onClick={onClose}>Cerrar</button>
          <button onClick={handleSaveImages}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalAdminImages;
