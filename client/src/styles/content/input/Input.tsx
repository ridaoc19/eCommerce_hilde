import { ReactNode } from 'react';
import Svg from '../../../components/assets/Svg';

interface Props {
  children: ReactNode,
  svg: {
    type: string,
    height?: number,
    width?: number,
    color?: string
  },
  svgTwo?: {
    type: string,
    height?: number,
    width?: number,
    color?: string
  }
  styleClass: string,
  errorMessage: string
}

function Input({ children, svg, svgTwo, styleClass, errorMessage }: Props) {

  return (
    <div className={`input input__container--${styleClass}`}>

      <div className={`${errorMessage ? "input_error" : "input_brand"} input__content--${styleClass}`}>
        <span>
          <span className={`input__svg--${styleClass}`}>
            {Svg({ type: svg.type, height: svg.height || 16, width: svg.width || 16, color: errorMessage ? "#DB2424" : svg.color ? svg.color : "#848FAC" })}
          </span>
          {children}
          <span className={`input__svgTwo--${styleClass}`}>
            {svgTwo && Svg({ type: svgTwo.type, height: svgTwo.height || 16, width: svgTwo.width || 16, color: errorMessage ? "#DB2424" : svg.color ? svg.color : "#848FAC" })}
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