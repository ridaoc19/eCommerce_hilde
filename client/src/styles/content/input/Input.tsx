import { ReactNode, useState, MouseEvent } from "react";
import Svg from "../../../components/assets/Svg";

interface Props {
  // children: ReactNode,
  svg?: {
    type: string;
    height?: number;
    width?: number;
    color?: string;
  };
  svgTwo?: {
    type: string;
    height?: number;
    width?: number;
    color?: string;
  };
  styleClass: string;
  errorMessage: string;
  input: {
    type?: string;
    placeholder: string;
    value: string;
    handleOnChange: (
      fieldName: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    name: string;
  };
}

function Input({ svg, svgTwo, styleClass, errorMessage, input }: Props) {
  const [toggle, setToggle] = useState(false);

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggle((data) => (data ? false : true));
  };

  return (
    <div className={`input input__container--${styleClass}`}>
      <div className={`${errorMessage ? "input_error" : "input_brand"} input__content--${styleClass}`} >
        <span style={{ border: errorMessage ? "1px solid #DB2424" : input.value.length === 0 ? "1px solid #FFA451" : "1px solid #66B949" }}>
          <span className={`input__svg--${styleClass}`}>
            {svg &&
              Svg({
                type: svg.type,
                height: svg.height || 16,
                width: svg.width || 16,
                color: errorMessage ? "#DB2424" : svg.color ? svg.color : "#848FAC",
              })}
          </span>
          <input
            type={input.type !== "password" ? input.type : toggle ? "text" : input.type}
            placeholder={input.placeholder}
            value={input.value}
            onChange={(event) => input.handleOnChange(input.name, event)}
            name={input.name}
          />
          <span
            className={`input__svgTwo--${styleClass}`}
            onClick={handleOnClick}
          >
            {svgTwo &&
              Svg({
                type: svgTwo.type !== "eye" ? svgTwo.type : toggle ? "openEye" : "closedEye",
                height: svgTwo.height || 16,
                width: svgTwo.width || 16,
                color: errorMessage ? "#DB2424" : svgTwo.color ? svgTwo.color : "#848FAC",
              })}
          </span>
        </span>
      </div>

      <div className={`input__error--${styleClass}`}>
        <div>
          <div className={`input__message${styleClass}`}>
            <span>{errorMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
