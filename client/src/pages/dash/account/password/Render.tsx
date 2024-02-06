import { Svg } from "../../../auth/login";

function Render() {

  return (
    <div>
      <div>
        {Svg({ type: "padlock" })}
        <span>********</span>
      </div>
    </div>
  );
}

export default Render;