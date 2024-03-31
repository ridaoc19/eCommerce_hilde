import { ReactNode } from "react";
import { HandleClick } from "../../../interfaces/global.interface";
import Svg, { SvgType } from "../../assets/icons/Svg";

export interface ButtonProps {
  svgRight?: {
    type: SvgType;
    height?: number;
    width?: number;
    color?: string;
  };

  svgLeft?: {
    type: SvgType;
    height?: number;
    width?: number;
    color?: string;
  };

  style?: React.CSSProperties;
  className?: string;
  button: {
    type: "dark" | "light" | "link" | "highlighter" | "none";
    text: string | ReactNode;
    disabled?: boolean;
    id?: string;
    value?: string | number;
    handleClick: HandleClick;
    dataset_button_extra?: string;
    dataset_button_index?: string;
  };
}

function Button({ button, svgRight, svgLeft, style, className = "" }: ButtonProps) {
  return (
    <button
      style={style}
      id={button.id}
      className={`button button_${button.type} ${className}`}
      onClick={button.handleClick}
      value={button.value}
      disabled={button.disabled}
    >
      {svgRight &&
        <span className={`button__svg-right`}>
          {Svg({ type: svgRight.type as SvgType, height: svgRight.height || 16, width: svgRight.width || 16, color: svgRight.color })}
        </span>}
      {!!button.text && <span className="button__text-container">
        <div>{button.text}</div>
      </span>}
      {svgLeft &&
        <span>
          {Svg({
            type: svgLeft.type,
            height: svgLeft.height || 16,
            width: svgLeft.width || 16,
            color: svgLeft.color
          })}
        </span>
      }
    </button>
  );
}

export default Button;