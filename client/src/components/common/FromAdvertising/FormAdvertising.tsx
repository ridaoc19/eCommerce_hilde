import { RefObject, useContext } from "react";
import { ParamsChildren } from "../../../hooks/useAdvertising/useAdvertising";
import { CreateContext } from "../../../hooks/useContext";
import { Components, InitialStateFormAdvertising, RouterDom, react, } from "./utils";
const { FormAdvertisingButton, FormAdvertisingForm, FormAdvertisingList, useMediaQuery, useModalConfirm, useMutationAdvertising } = Components
const { useEffect, useState, RouteAdvertising } = react;
const { useLocation } = RouterDom;

interface FormAdvertisingProps extends ParamsChildren {
  // advertising: Partial<IContextData['advertising']['advertisingContextState']['advertisingData']['data']['dataAdvertising']>;
  // location: IAdvertising.TotalLocation;
  componentMount?: RefObject<HTMLDivElement>;
  title: string
}

function FormAdvertising({ advertising, location, componentMount, title }: FormAdvertisingProps) {
  const { dashboard: { stateDashboard: { permits: { edit } } } } = useContext(CreateContext)
  const { tools: { mutate }, isLoading, error, status } = useMutationAdvertising();
  // const { tools: { mutate, resetError }, isLoading, error, status } = useMutationAdvertising();
  const { ModalComponent, closeModal, openModal } = useModalConfirm()
  const { mediaQuery } = useMediaQuery();
  const { pathname } = useLocation();

  const page = (pathname.split('/').filter(Boolean)[0] || 'home') as "home" | "product-detail" | "list-products";

  const initialStateFormAdvertising: InitialStateFormAdvertising = {
    change: { page, location, title: "", redirect: "", text: "", image_desktop: "", image_tablet: "", image_phone: "" },
    error: { page: "", location: "", title: "", text: "", redirect: "", image_desktop: "", image_tablet: "", image_phone: "" },
    advertising_id: "",
    status: "save"
  };

  const [stateInput, setStateInput] = useState<InitialStateFormAdvertising>(initialStateFormAdvertising);

  useEffect(() => {
    if (status === 'success') {
      setStateInput(initialStateFormAdvertising);
      const inputElement = document.getElementById(`input__images`) as HTMLInputElement | null; //limpia input files
      if (inputElement) inputElement.value = '';
    } else if (status === 'error' && error?.errors) {
      const restructureError = Object.keys(stateInput.error).reduce((acc, key) => {
        const find = error.errors.find(({ field }) => field === key);
        return { ...acc, [key]: find ? find.message : "" };
      }, {});
      setStateInput((prev) => ({ ...prev, error: { ...prev.error, ...restructureError } }));
    }
    // eslint-disable-next-line
  }, [status])

  const handleCancel = () => closeModal();

  const handleConfirm = () => {
    if (stateInput.status === 'save') {
      mutate({ route: RouteAdvertising.AdvertisingCreate, options: { requestData: stateInput.change } });
    } else if (stateInput.status === 'edit') {
      mutate({ route: RouteAdvertising.AdvertisingEdit, options: { requestData: stateInput.change, extensionRoute: `/${stateInput.advertising_id}` } })
    } else if (stateInput.status === 'delete') {
      mutate({ route: RouteAdvertising.AdvertisingDelete, options: { extensionRoute: `/${stateInput.advertising_id}` } })

    }
  }

  const handleItemClick = ({ advertising_id: advertising_id_param, type }: { advertising_id: string, type: "edit" | "delete" | "save" }) => {
    if (advertising && !!advertising_id_param) {
      const findAdvertising = advertising.find(e => e?.advertising_id === advertising_id_param);
      if (findAdvertising) {
        const { advertising_id, ...newAdvertising } = findAdvertising;
        if (type === 'edit') {
          setStateInput((prevState) => ({
            ...prevState,
            status: "edit",
            change: newAdvertising,
            advertising_id,
          }));
        } else if (type === 'delete') {
          setStateInput((prevState) => ({
            ...prevState, status: "delete",
            change: newAdvertising,
            advertising_id,
          }));
        }
      }
      if (type === 'save') {
        setStateInput((prevState) => ({ ...prevState, status: "save" }));
        openModal(`Deseas ${stateInput.status}?`, handleConfirm, handleCancel);
      }
    }
  };

  return (
    <>
      {edit ? <div ref={componentMount} className="advertising-form">
        {/* {error && <ErrorMessage errors={error.errors.map(e => { return { ...e, status_code: error.status_code } })} emptyMessage={() => resetError()} />} */}
        {isLoading && <div>Loading...</div>}
        <div className="advertising-form-title">
          <h3>{title}</h3>
        </div>

        <div className={`advertising-form__list`}>
          {advertising && <FormAdvertisingList advertising={advertising} handleItemClick={handleItemClick} stateInput={stateInput} />}
        </div>

        <div className={`advertising-form__input ${mediaQuery}`}>
          <FormAdvertisingForm stateInput={stateInput} setStateInput={setStateInput} initialStateFormAdvertising={initialStateFormAdvertising} />
        </div>

        {ModalComponent}

        <div className={`advertising-form__button`} >
          <FormAdvertisingButton handleItemClick={handleItemClick} handleClickEmpty={() => setStateInput(initialStateFormAdvertising)} status={stateInput.status} />
        </div>
      </div> : null}
    </>
  );
}

export default FormAdvertising;
