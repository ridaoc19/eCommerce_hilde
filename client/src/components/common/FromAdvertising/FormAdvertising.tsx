import { RefObject, useState } from "react";
import { useLocation } from "react-router-dom";
import { IContextData } from "../../../hooks/useContext";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useMutationAdvertising from "../../../hooks/useMutationAdvertising";
import { IAdvertising } from "../../../interfaces/advertising.interface";
import { HandleChangeText } from "../../../interfaces/global.interface";
import { RequestMapAdvertising, RouteAdvertising } from "../../../services/advertising/advertisingRequest";
import Input from "../Input/Input";
import FormAdvertisingButton from "./FormAdvertisingButton";
import FormAdvertisingList from "./FormAdvertisingList";
import './formAdvertising.scss';
import Button from "../button/Button";

// Interfaces
export interface InitialStateFormAdvertising {
  change: RequestMapAdvertising[RouteAdvertising.AdvertisingCreate]['requestData'];
  error: Omit<RequestMapAdvertising[RouteAdvertising.AdvertisingCreate]['requestData'], 'image_desktop' | 'image_phone' | 'image_tablet'> & { image_desktop: string, image_phone: string, image_tablet: string };
  advertising_id: string;
  status: "save" | "edit" | "delete" | ""
}

interface FormAdvertisingProps {
  advertising: Partial<IContextData['advertising']['advertisingContextState']>;
  location: IAdvertising.TotalLocation;
  componentMount?: RefObject<HTMLDivElement>;
}

// // Función para crear un objeto File ficticio
// const createFileObject = (name: string, type: string): File => {
//   const fileContent = noImage;
//   const blob = new Blob([fileContent], { type: type });
//   const file = new File([blob], name, { type: type, lastModified: Date.now() });
//   return file;
// };

// Función para manejar el estado de las imágenes
const handleImageChange = (key: keyof InitialStateFormAdvertising['change'], files: FileList | null, stateInput: InitialStateFormAdvertising, setStateInput: React.Dispatch<React.SetStateAction<InitialStateFormAdvertising>>): void => {
  console.log(stateInput);

  if (files && files.length > 0) {
    setStateInput((prevState) => ({
      ...prevState,
      change: {
        ...prevState.change,
        [key]: files[0],
      },
    }));
  }
};

// Componente FormAdvertising
function FormAdvertising({ advertising: { advertisingData }, location, componentMount }: FormAdvertisingProps) {
  const { mutate } = useMutationAdvertising();
  const { mediaQuery } = useMediaQuery();
  const { pathname } = useLocation();

  const page = (pathname.split('/').filter(Boolean)[0] || 'home') as "home" | "product-detail" | "list-products";

  const initialStateFormAdvertising: InitialStateFormAdvertising = {
    change: { page, location, title: "", redirect: "", text: "", image_desktop: "", image_tablet: "", image_phone: "" },
    error: { page: "", location: "", title: "", text: "", redirect: "", image_desktop: "", image_tablet: "", image_phone: "" },
    advertising_id: "",
    status: ""
  };

  const [stateInput, setStateInput] = useState<InitialStateFormAdvertising>(initialStateFormAdvertising);

  const handleItemClick = ({ advertising_id, type }: { advertising_id: string, type: "edit" | "delete" | "save" }) => {
    if (type === 'edit') {
      setStateInput((prevState) => ({
        ...prevState,
        status: "edit",
        change: advertisingData?.data.find(e => e.advertising_id === advertising_id)!,
        advertising_id,
      }));
    } else if (type === 'delete') {
      setStateInput((prevState) => ({
        ...prevState,
        status: "delete",
        advertising_id,
      }));
    } else {
      mutate({ route: RouteAdvertising.AdvertisingCreate, options: { requestData: stateInput.change } });
      setStateInput(initialStateFormAdvertising);
      const inputElement = document.getElementById(`input__images`) as HTMLInputElement | null; //limpia input files
      if (inputElement) inputElement.value = '';
    }
  };

  const handleChange: HandleChangeText = ({ target }) => {
    setStateInput((prevState) => ({
      ...prevState,
      change: {
        ...prevState.change,
        [target.name]: target.value,
      },
    }));
  };

  return (
    <div ref={componentMount} className="advertising-form">
      <div className={`advertising-form__list`}>
        {advertisingData?.data && <FormAdvertisingList advertising={advertisingData.data} handleItemClick={handleItemClick} stateInput={stateInput} />}
      </div>

      <div className={`advertising-form__input ${mediaQuery}`}>
        {(Object.keys(initialStateFormAdvertising.change).filter((key) => ['title', 'redirect', 'text'].includes(key) && key !== 'page' && key !== 'location') as (keyof Pick<InitialStateFormAdvertising['change'], 'title' | 'redirect' | 'text'>)[]).map((item) => (
          <Input
            key={item}
            styleClass={`login--${item}`}
            errorMessage={stateInput.error[item] || advertisingData?.errors.find((e) => e.field === item)?.message}
            input={{ type: item, placeholder: item, value: stateInput.change[item], handleOnChange: handleChange, name: item }}
          />
        ))}
        {Object.entries(stateInput.change).filter((e) => ['image_desktop', 'image_phone', 'image_tablet'].includes(e[0])).map(([key, value]: any, index) => (
          <div key={index} className="advertising-form__input-images">
            <input id={`input__images`} multiple className={`input__images`} type="file" name={`images_${key}`} onChange={(event) => handleImageChange(key, event.target.files, stateInput, setStateInput)} />
            <h5>{key}</h5>
            <div>
              {!!value && typeof value === 'object' ? <img src={URL.createObjectURL(value)} alt="" /> : <img src={value} height={"100%"} alt={``} />}
              <Button button={{
                type: 'dark', text: "Eliminar Imagen", handleClick: () => {
                  const inputElement = document.getElementById(`input__images`) as HTMLInputElement | null; //limpia input files
                  if (inputElement) inputElement.value = '';
                  setStateInput({ ...stateInput, change: { ...stateInput.change, [key]: "" } })
                },
              }} />
            </div>
          </div>
        ))}
      </div>

      <div className={`advertising-form__button`} >
        <FormAdvertisingButton handleItemClick={handleItemClick} handleClickEmpty={() => setStateInput(initialStateFormAdvertising)} />
      </div>
    </div>
  );
}

export default FormAdvertising;
