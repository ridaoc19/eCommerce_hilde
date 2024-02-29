import { Dispatch, SetStateAction } from 'react';
import { HandleChangeText, HandleClick } from '../../interfaces/global.interface';
import './adminImages.scss';
import useMediaQuery from '../useMediaQuery';
import Button from '../../components/common/button/Button';

interface ModalAdminImagesProps {
  files: File[],
  handleUploadImage: HandleChangeText,
  handleDeleteImage: HandleClick,
  handleSaveImages: HandleClick,
  isOpen: boolean,
  onClose: () => void,
  setModalOpen: Dispatch<SetStateAction<boolean>>
  allImages: string[]
}

function ModalAdminImages({ handleDeleteImage, setModalOpen, handleSaveImages, allImages, handleUploadImage, files, isOpen, onClose }: ModalAdminImagesProps) {
  const { mediaQuery } = useMediaQuery()

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button onClick={() => {
        document.body.classList.add('body-scroll-locked');
        setModalOpen(true)
      }}>Administrar Imágenes</button>

      {/* Modal */}
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        {/* <div className="modal__content"> */}

          <div className='modal-header'>
            <h2>Administrar Imágenes</h2>
          </div>

          <div className={`modal-main ${mediaQuery}`}>
            <div className='modal-main__images-stored'>
              <h3>Imágenes Almacenadas</h3>
              <ul>
                {allImages.map((media, index) => (
                  <img key={index} src={media} alt="" />
                ))}
              </ul>
            </div>

            <div className='modal-main__images-add'>
              <div className='modal-main__images-add-input'>
                <input id={`input__images`} multiple className='input__images' type='file' name='images' onChange={handleUploadImage} />
              </div>

              <div className='modal-main__images-add-render'>
                {files.map((image, index) => (
                  <div key={index}>
                    <img src={URL.createObjectURL(image)} width={"100%"} alt={`${index}`} />
                    <Button button={{ type: 'dark', text: "Eliminar Imagen", handleClick: handleDeleteImage, }} />
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className='modal-button'>
            <button onClick={() => {
              onClose()
              document.body.classList.remove('body-scroll-locked');
            }}>Cerrar</button>
            <button onClick={handleSaveImages}>Guardar</button>
          </div>

        </div>

      {/* </div> */}
    </div>
  );
}

export default ModalAdminImages;
