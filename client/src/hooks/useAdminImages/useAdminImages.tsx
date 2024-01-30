import { ReactNode, useEffect, useState } from 'react';
import { HandleChangeText, HandleClick } from '../../interfaces/global.interface';
import { imagesAdmin } from '../../services/images/imagesApi';
import { useMutation, useQueryClient } from 'react-query';
import { media_tempoApi } from '../../services/images/media-tempo';
import ModalAdminImages from './ModalAdminImages';

interface UseAdminImagesReturnProps {
  ModalAdminImages: ReactNode
}

function useAdminImages({ location }: { location: string }): UseAdminImagesReturnProps {
  const [files, setFiles] = useState<File[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [allImages, setAllImages] = useState<{ media: string, location: string }[]>([])
console.log(files, "files")
  const queryClient = useQueryClient();

  const mutationSaveServerImages = useMutation({
    mutationFn: async ({ file, name }: { file: File[], name: string }) => {
      const media = await imagesAdmin({ toRequest: { file, name } })
      return { media, location: name }
    },
    onSuccess: ({ media, location }) => {
      // La primera mutación fue exitosa, ahora ejecutamos la segunda mutación
      mutationSaveImages.mutate({ media, location });
    },
  });

  const mutationSaveImages = useMutation({
    mutationFn: ({ media, location }: { media: string[], location: string }) => {
      const dataMedia = media.length > 0 ? media.map(el => `${process.env.REACT_APP_SERVER_FILE}/${el}`) : []
      return media_tempoApi({ media: dataMedia, location })
    },
    onSuccess: (data) => {
      // Actualizar los datos en caché después de la segunda mutación
      setFiles([])
      const inputElement = document.getElementById(`input__images`) as HTMLInputElement | null; //limpia input files
      if (inputElement) inputElement.value = '';
      setAllImages(data.data)
      queryClient.invalidateQueries('posts');
    },
  });



  useEffect(() => {
    console.log({ mutationSaveImages, allImages })
    console.log()
  }, [mutationSaveImages])

  useEffect(() => {
    mutationSaveImages.mutate({ media: [], location })
  }, [])



  const handleSaveImages: HandleClick = async (event) => {
    event.preventDefault();
    mutationSaveServerImages.mutate({
      file: files, name: location
    })
    // const { value } = event.target as HTMLButtonElement;
    // const save = await imagesAdmin({
    //   toRequest: {
    //     file: images,
    //     name: "ensayo"
    //   }
    // })

    // console.log(save)


  }


  const handleUploadImage: HandleChangeText = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const inputElement = document.getElementById(`input__images-`) as HTMLInputElement | null; //limpia input files
      const fileList = Array.from(files) as File[];

      if (fileList.length > 3) {
        if (inputElement) inputElement.value = '';
        // const messageImage = imagesString > 0 ? `Tienes almacenadas ${imagesString} imágenes y quieres agregar ${imagesFile}, solo puedes agregar un total 3 imágenes` : `Solo se puede subir tres imágenes y estas cargando ${totalImages}`
        // setState({ ...state, error: { ...state.error, images: messageImage } })
      } else if (fileList.length === 0) {
        // setState({ ...state, error: { ...state.error, images: 'Debes subir al menos una imagen' } })
      } else {
        setFiles(prevState => ([...prevState, ...fileList]))
      }
    }
  };

  const handleDeleteImage: HandleClick = (event) => {
    event.preventDefault();
    const { value } = event.target as HTMLButtonElement;
    // Crear una nueva copia del array sin el elemento a eliminar
    const updatedImages = [...files];
    updatedImages.splice(+value, 1);

    setFiles(updatedImages);
  };

  return {
    ModalAdminImages: <ModalAdminImages
      handleDeleteImage={handleDeleteImage}
      handleSaveImages={handleSaveImages}
      handleUploadImage={handleUploadImage}
      files={files}
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      setModalOpen={setModalOpen}
      allImages={allImages}
    />
  };
}

export default useAdminImages;
