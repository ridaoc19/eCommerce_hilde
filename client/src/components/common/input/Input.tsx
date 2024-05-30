import { useState } from "react"
import Svg from "../../../assets/icons/Svg"
import { SvgType } from "../../../assets/icons/svgType"

export default function Input() {
  // !   data    actualiza           estado inicial
  const [state, setState] = useState('')
  const [error, setError] = useState('')


  return (
    <div>
      <Svg type={SvgType.Email} />
      <input
        type="text"
        placeholder="hola"
        value={state}
        onChange={(event) => {
          if (event.target.value.length > 5) {
            return setError('no puede tener mas de 5 caracteres')
          } else {
            setError('')
            setState(event.target.value)
          }
        }}
      />
      <span>{error}</span>
    </div>
  )

}
