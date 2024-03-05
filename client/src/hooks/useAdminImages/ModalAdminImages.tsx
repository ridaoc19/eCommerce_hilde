import { Dispatch, SetStateAction } from 'react';
import Button from '../../components/common/button/Button';
import { HandleChangeText, HandleClick } from '../../interfaces/global.interface';
import useMediaQuery from '../useMediaQuery';
import './adminImages.scss';
import { InitialStateAdminFiles } from './useAdminImages';

interface ModalAdminImagesProps {
  setStateAdminFiles: Dispatch<SetStateAction<InitialStateAdminFiles>>
  handleUploadImage: HandleChangeText,
  handleDeleteImage: HandleClick,
  handleSaveImages: HandleClick,
  handleSelectedFiles: (url: string) => void,
  isOpen: boolean,
  onClose: () => void,
  setModalOpen: Dispatch<SetStateAction<boolean>>
  stateAdminFiles: InitialStateAdminFiles
}

function ModalAdminImages({ stateAdminFiles, handleSelectedFiles, handleDeleteImage, setModalOpen, handleSaveImages, handleUploadImage, isOpen, onClose }: ModalAdminImagesProps) {
  const { requestData, responseData, selectedFiles } = stateAdminFiles
  const { mediaQuery } = useMediaQuery()

  return (
    <div>
      {/* Botón para abrir el modal */}
      <button onClick={() => {
        document.body.classList.add('body-scroll-locked');
        setModalOpen(true)
      }}>Archivos de {requestData.toStore.name}</button>

      {/* Modal */}
      <div className={`admin-images_modal ${isOpen ? 'open' : ''}`}>
        {/* <div className="modal__content"> */}

        <div className='modal-header'>
          <h2>Administrar Imágenes</h2>
        </div>

        <div className={`modal-main ${mediaQuery}`}>
          <div className='modal-main__images-stored'>
            <div className='modal-main__images-stored-title'>
              <h3>Imágenes Almacenadas</h3>
              <h4>{requestData.toStore.entity}</h4>
              <h5>{requestData.toStore.location}</h5>
              <h6>{requestData.toStore.name}</h6>
              <h6>{requestData.toStore.typeFile}</h6>
            </div>

            <div className='modal-main__images-stored-content' >
              {responseData.length > 0 && responseData.map((media) => (
                <div key={media.file_id} onClick={() => handleSelectedFiles(media.url)} className={`images-stored__container ${selectedFiles.img.some(e => e === media.url) ? 'selected' : ''}`}>
                  <div className='image'>
                    {requestData.toStore.typeFile === 'images' ? <img src={media.url} alt="" /> : <iframe
                      width="200px"
                      height="100px"
                      src={media.url}
                      title="video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>}
                  </div>
                  <div className='name'>
                    <h6>{media.name}</h6>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className='modal-main__images-add'>
            <div className='modal-main__images-add-input'>
              <input
                multiple
                id={`input__images`}
                className='input__images'
                type='file'
                name='images'
                onChange={handleUploadImage}
                accept={requestData.toStore.typeFile === 'images' ? 'image/*' : 'video/*'}
              />
            </div>

            <div className='modal-main__images-add-render'>
              {requestData.toStore.file.map((image, index) => (
                <div key={index}>
                  <div>
                    {requestData.toStore.typeFile === 'images' ? <img src={URL.createObjectURL(image)} alt={`${index}`} /> : <video src={URL.createObjectURL(image)} controls width={200} height={100} />}
                  </div>
                  <div>
                    <Button button={{ type: 'dark', text: "Eliminar", handleClick: handleDeleteImage, value: index }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className='modal-footer'>
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
