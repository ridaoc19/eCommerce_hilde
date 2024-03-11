import { IContextData } from '../../../hooks/useContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Svg from '../../assets/icons/Svg';
import { InitialStateFormAdvertising } from './utils';

interface FormAdvertisingListProps {
  advertising: IContextData['advertising']['advertisingContextState']['advertisingData']['data']['dataAdvertising'];
  handleItemClick: (data: { advertising_id: string, type: "edit" | "delete" | "save" }) => void
  stateInput: InitialStateFormAdvertising
}

function FormAdvertisingList({ advertising, handleItemClick, stateInput }: FormAdvertisingListProps) {
  const { mediaQuery } = useMediaQuery();

  return (
    <ul className="advertising-form__list-container">
      {[...[{ ...advertising[0], advertising_id: "1" }], ...advertising]?.map((item, index) => {
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
          </li>
        )
      })}
    </ul>
  );
}

export default FormAdvertisingList;