import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { IFiles } from '../../interfaces/files.interface';
import { HandleChangeText, HandleClick } from '../../interfaces/global.interface';
import { filesRequest } from '../../services/files/filesApi';
import { RequestMapFiles, RouteFiles } from '../../services/files/filesRequest';
import ModalAdminImages from './ModalAdminImages';
interface UseAdminImagesReturnProps {
  ModalAdminImages: ReactNode;
  selectedFiles: {
    nameComponent: string,
    img: string[]
  };
  typeFile: 'images' | 'videos'
  openModal: (data: string, typeFile: InitialStateAdminFiles['requestData']['toStore']['typeFile']) => void
}

export interface InitialStateAdminFiles {
  requestData: RequestMapFiles[RouteFiles.FilesCreateDelete]['requestData']
  responseData: IFiles.Files[]
  selectedFiles: {
    nameComponent: string,
    img: string[]
  };
}

function useAdminImages({ location, entity }: { location: string, entity: string }): UseAdminImagesReturnProps {
  const queryClient = useQueryClient();
  const initialStateAdminFiles: InitialStateAdminFiles = {
    requestData: {
      toStore: {
        entity,
        file: [],
        location,
        typeFile: 'images',
        name: '',
        selected: false
      },
      toDelete: []
    },
    responseData: [],
    selectedFiles: {
      nameComponent: "",
      img: []
    }
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [stateAdminFiles, setStateAdminFiles] = useState<InitialStateAdminFiles>(initialStateAdminFiles);
  const { requestData, selectedFiles } = stateAdminFiles;
  const { mutate } = useMutation({
    mutationFn: async ({ route, options }: { route: RouteFiles, options: Omit<RequestMapFiles[RouteFiles], 'route' | 'data'> }) => {
      const requestData = await filesRequest(route).options(options);
      return requestData;
    },
    onSuccess({ data }, { route }) {
      setStateAdminFiles({
        ...stateAdminFiles,
        responseData: data.data,
        requestData: {
          ...stateAdminFiles.requestData,
          toStore: { ...initialStateAdminFiles.requestData.toStore, entity, location, name: requestData.toStore.name, typeFile: requestData.toStore.typeFile }
        }
      })
      if (route === RouteFiles.FilesRequest) {
        queryClient.setQueryData([IFiles.QUERY_KEY_FILES.Files], data);
      } else {
        const inputElement = document.getElementById(`input__images`) as HTMLInputElement | null; //limpia input files
        if (inputElement) inputElement.value = '';
        queryClient.invalidateQueries({ queryKey: [IFiles.QUERY_KEY_FILES.Files] })
      }
    },
  });

  function requestMutation<T extends RouteFiles>({ route, options }: { route: T, options: Omit<RequestMapFiles[T], 'route' | 'data'> }) {
    mutate({ route, options })
  }

  const handleSaveImages: HandleClick = async (event) => {
    event.preventDefault();
    if (requestData.toStore) {

      requestMutation({
        route: RouteFiles.FilesCreateDelete,
        options: {
          requestData,
          extensionRoute: `?entity=${requestData.toStore.entity}&location=${requestData.toStore.location}&selected=${requestData.toStore.selected}&name=${requestData.toStore.name}&typeFile=${requestData.toStore.typeFile}`
        }
      })
    }
  }

  const handleUploadImage: HandleChangeText = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const fileList = Array.from(files) as File[];
      setStateAdminFiles(prevState => ({ ...prevState, requestData: { ...prevState.requestData, toStore: { ...prevState.requestData.toStore, file: [...prevState.requestData.toStore.file, ...fileList] } } }))
    }
  };

  const handleDeleteImage: HandleClick = (event) => {
    event.preventDefault();
    const { value } = event.target as HTMLButtonElement;
    const inputElement = document.getElementById(`input__images`) as HTMLInputElement | null; //limpia input files
    if (inputElement) inputElement.value = '';

    // Crear una nueva copia del array sin el elemento a eliminar
    const updatedImages = [...requestData.toStore.file];
    updatedImages.splice(+value, 1);
    setStateAdminFiles(prevState => ({ ...prevState, requestData: { ...prevState.requestData, toStore: { ...prevState.requestData.toStore, file: updatedImages } } }))
  };

  const handleSelectedFiles = (url: string) => {
    setStateAdminFiles(prevState => {
      // Verificar si la URL ya existe en el array selectedFiles
      const urlExists = prevState.selectedFiles.img.includes(url);

      if (urlExists) {
        // Si la URL ya existe, eliminarla del array
        return {
          ...prevState,
          selectedFiles: { ...prevState.selectedFiles, img: prevState.selectedFiles.img.filter(fileUrl => fileUrl !== url) }
        };
      } else {
        // Si la URL no existe, agregarla al array
        return {
          ...prevState,
          selectedFiles: { ...prevState.selectedFiles, img: [...prevState.selectedFiles.img, url] }
        };
      }
    });
  };

  const openModal = (nameComponent: string, typeFiles: InitialStateAdminFiles['requestData']['toStore']['typeFile']) => {
    setStateAdminFiles(prevState => ({
      ...prevState,
      selectedFiles: { ...prevState.selectedFiles, nameComponent: nameComponent },
      requestData: { ...prevState.requestData, toStore: { ...prevState.requestData.toStore, name: nameComponent, typeFile: typeFiles } }
    }))
    if (requestData.toStore) {
      requestMutation({
        route: RouteFiles.FilesRequest,
        options: {
          extensionRoute: `?entity=${requestData.toStore.entity}&location=${requestData.toStore.location}&selected=${requestData.toStore.selected}&name=${nameComponent}&typeFile=${typeFiles}`
        }
      })
    }
    setModalOpen(true);
  };

  return {
    ModalAdminImages: modalOpen ? (
      <ModalAdminImages
        setStateAdminFiles={setStateAdminFiles}
        handleDeleteImage={handleDeleteImage}
        handleSaveImages={handleSaveImages}
        handleUploadImage={handleUploadImage}
        handleSelectedFiles={handleSelectedFiles}
        isOpen={modalOpen}
        onClose={() => {
          setStateAdminFiles(initialStateAdminFiles)
          setModalOpen(false)
        }}
        setModalOpen={setModalOpen}
        stateAdminFiles={stateAdminFiles}
      />) : null,
    selectedFiles,
    openModal,
    typeFile: requestData.toStore.typeFile
  };
}

export default useAdminImages;