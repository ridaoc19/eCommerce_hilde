import { MouseEvent, useState } from "react";
import Svg, { SvgType } from "../../../assets/icons/Svg";
import { HandleChangeText } from "../../../interfaces/global.interface";

export interface InputProps {
  svg?: {
    type: SvgType;
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
  errorMessage: string | undefined;
  input: {
    type?: string;
    placeholder: string;
    value: string | number;
    handleOnChange: HandleChangeText
    name: string;
    dataset_extra?: string;
    dataset_index?: string;
  };
}

function UserInput({ svg, svgTwo, styleClass, errorMessage, input }: InputProps) {
  const [toggle, setToggle] = useState(false);

  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToggle((data) => (data ? false : true));
  };

  return (
    <div className={`user-input input__container--${styleClass}`}>
      <div className={`${errorMessage ? "input_error" : "input_brand"} input__content--${styleClass}`} >
        <span style={{ border: errorMessage ? "1px solid #DB2424" : (input.value.toString().length === 0) ? "1px solid #FFA451" : "1px solid #66B949" }}>
          <span className={`input__svg--${styleClass}`}>
            {svg &&
              Svg({
                type: svg.type as SvgType,
                height: svg.height || 16,
                width: svg.width || 16,
                color: errorMessage ? "#DB2424" : svg.color ? svg.color : "#848FAC",
              })}
          </span>
          <input
            type={input.type !== "password" ? input.type : toggle ? "text" : input.type}
            placeholder={input.placeholder}
            value={input.value}
            onChange={(event) => input.handleOnChange(event)}
            name={input.name}
            data-extra={input.dataset_extra}
            data-index={input.dataset_index}
          />
          <span
            className={`input__svgTwo--${styleClass}`}
            onClick={handleOnClick}
          >
            {svgTwo &&
              Svg({
                type: svgTwo.type !== "eye" ? svgTwo.type as SvgType : toggle ? "openEye" : "closedEye",
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

export default UserInput;
