import { RefObject, useState } from "react";
import { useLocation } from "react-router-dom";
import Svg from "../../assets/icons/Svg";
import Input from "../Input/Input";
import Button from "../button/Button";
import { IAdvertising } from "../../../interfaces/advertising.interface";
import { HandleChangeText } from "../../../interfaces/global.interface";
import { RequestMapAdvertising, RouteAdvertising } from "../../../services/advertising/advertisingRequest";
import { IContextData } from "../../../hooks/useContext";
import './formAdvertising.scss';
import useMediaQuery from "../../../hooks/useMediaQuery";

// Interfaces
interface InitialStateFormAdvertising {
  change: RequestMapAdvertising[RouteAdvertising.AdvertisingCreate]['requestData'];
  error: RequestMapAdvertising[RouteAdvertising.AdvertisingCreate]['requestData'];
  advertising_id: string;
}

interface FormAdvertisingProps {
  advertising: Partial<IContextData['advertising']['advertisingContextState']>;
  location: IAdvertising.TotalLocation;
  componentMount?: RefObject<HTMLDivElement>;
}


// Componente FormAdvertising
function FormAdvertising({ advertising: { advertisingData }, location, componentMount }: FormAdvertisingProps) {
  const { mediaQuery } = useMediaQuery()
  const { pathname } = useLocation();
  const page = pathname.split('/').filter(Boolean)[0] || 'home' as "home" | "product-detail" | "list-products";
  const initialStateFormAdvertising: InitialStateFormAdvertising = {
    change: { page, location, title: "", redirect: "", text: "", image_desktop: "", image_tablet: "", image_phone: "" },
    error: { page: "", location: "", title: "", text: "", redirect: "", image_desktop: "", image_tablet: "", image_phone: "" },
    advertising_id: ""
  };

  const [stateInput, setStateInput] = useState(initialStateFormAdvertising);

  const handleItemClick = ({ advertising_id, type }: { advertising_id: string, type: "edit" | "delete" | "save" }) => {
    if (type === 'edit') {
      setStateInput({ ...stateInput, advertising_id, change: advertisingData?.data.find(e => e.advertising_id === advertising_id)! })
    } else if (type === 'delete') {

    } else {

    }
  };

  const handleChange: HandleChangeText = ({ target }) => {
    setStateInput({ ...stateInput, change: { ...stateInput.change, [target.name]: target.value } });
  };

  return (
    <div ref={componentMount} className="advertising-form">
      <div className={`advertising-form__list`}>
        <ul className="advertising-form__list-container">
          {advertisingData?.data && [...[{ ...advertisingData.data[0], advertising_id: "1" }], ...advertisingData?.data]?.map((item, index) => {
            const isSelected = item.advertising_id === stateInput.advertising_id
            return (
              <li key={index} className={`advertising-form__list-item ${isSelected ? 'selected' : ''} ${mediaQuery}`}>
                <div className={`${index === 0 ? 'item-title' : ''} title`}>{index === 0 ? "Titulo" : item.title}</div>
                <div className={`${index === 0 ? 'item-title' : ''} `}>{index === 0 ? mediaQuery === 'phone' ? Svg({ type: 'redirect', height: 16, width: 16 }) : "Redirigir" : item.redirect ? Svg({ type: 'check', color: "green" }) : Svg({ type: 'uncheck', color: "red" })}</div>
                <div className={`${index === 0 ? 'item-title' : ''} `}>{index === 0 ? mediaQuery === 'phone' ? Svg({ type: 'text', height: 16, width: 16 }) : "Texto" : item.text ? Svg({ type: 'check', color: "green" }) : Svg({ type: 'uncheck', color: "red" })}</div>
                <div className={`${index === 0 ? 'item-title' : ''} `}>{index === 0 ? mediaQuery === 'phone' ? Svg({ type: 'desktop', height: 16, width: 16 }) : "Imagen Escritorio" : item.image_desktop ? Svg({ type: 'check', color: "green" }) : Svg({ type: 'uncheck', color: "red" })}</div>
                <div className={`${index === 0 ? 'item-title' : ''} `}>{index === 0 ? mediaQuery === 'phone' ? Svg({ type: 'tablet', height: 16, width: 16 }) : "Imagen Tablet" : item.image_tablet ? Svg({ type: 'check', color: "green" }) : Svg({ type: 'uncheck', color: "red" })}</div>
                <div className={`${index === 0 ? 'item-title' : ''} `}>{index === 0 ? mediaQuery === 'phone' ? Svg({ type: 'mobile', height: 16, width: 16 }) : "Imagen Celular" : item.image_phone ? Svg({ type: 'check', color: "green" }) : Svg({ type: 'uncheck', color: "red" })}</div>
                <div className={`${index === 0 ? 'item-title' : ''} `}>{index === 0 ? mediaQuery === 'phone' ? Svg({ type: 'edit', height: 16, width: 16 }) : "Editar" : <button onClick={() => handleItemClick({ advertising_id: item.advertising_id, type: "edit" })}>{Svg({ type: "edit", width: 16, height: 16 })}</button>}</div>
                <div className={`${index === 0 ? 'item-title' : ''} `}>{index === 0 ? mediaQuery === 'phone' ? Svg({ type: 'delete', height: 16, width: 16 }) : "Eliminar" : <button onClick={() => handleItemClick({ advertising_id: item.advertising_id, type: "delete" })}>{Svg({ type: "delete", width: 16, height: 16 })}</button>}</div>
                {/* <Button button={{ type: "dark", handleClick: () => handleItemClick({ advertising_id: item.advertising_id, type: "edit" }), text: "" }} svgRight={{ type: "edit", }} />
<Button button={{ type: "dark", handleClick: () => handleItemClick({ advertising_id: item.advertising_id, type: "delete" }), text: "" }} svgRight={{ type: "delete", }} /> */}
              </li>
            )
          })}
        </ul>
      </div>
      <div className={`advertising-form__input ${mediaQuery}`}>
        {(Object.keys(initialStateFormAdvertising.change).filter(key => !['page', 'location', 'advertising_id'].includes(key)) as (keyof Omit<InitialStateFormAdvertising['change'], 'page' | 'location' | 'advertising_id'>)[]).map((item) => (
          <Input
            key={item}
            styleClass={`login--${item}`}
            errorMessage={stateInput.error[item] || advertisingData?.errors.find(e => e.field === item)?.message}
            input={{ type: item, placeholder: item, value: stateInput.change[item], handleOnChange: handleChange, name: item }}
          />
        ))}
      </div>
      <div className={`advertising-form__button`} >
        <div>
          <Button button={{ type: "dark", handleClick: () => handleItemClick({ advertising_id: "1", type: "save" }), text: "Guardar" }} />
          <Button button={{ type: "dark", handleClick: () => setStateInput(initialStateFormAdvertising), text: "Limpiar" }} />
        </div>
      </div>
    </div>
  );
}

export default FormAdvertising;
