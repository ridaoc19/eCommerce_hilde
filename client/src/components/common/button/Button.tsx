import Svg, { SvgType } from "../../../assets/icons/Svg";
import { HandleClick } from "../../../interfaces/global.interface";

export interface ButtonProps {
  svg?: {
    type: SvgType;
    height?: number;
    width?: number;
    color?: string;
  };

  styleClass?: string;
  button: {
    type: "dark" | "light" | "link" | "highlighter" | "none";
    text: string;
    value?: string | number;
    handleClick: HandleClick;
    dataset_button_extra?: string;
    dataset_button_index?: string;
  };
}

function Button({ button, styleClass, svg }: ButtonProps) {
  return (
    <button className={`button_${button.type} button`} onClick={button.handleClick}>
      {svg && <span className={`input__svg input__svg--${styleClass}`}>
        {Svg({ type: svg.type as SvgType, height: svg.height || 16, width: svg.width || 16, color: svg.color })}
      </span>}
      <span>
        <p>{button.text}</p>
      </span>
    </button>
  );
}

export default Button;