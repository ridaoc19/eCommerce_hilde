import Svg from "../../../../assets/icons/Svg";

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