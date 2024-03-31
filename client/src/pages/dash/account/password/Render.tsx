import Svg from "../../../../components/assets/icons/Svg";

function Render() {

  return (
    <div className='account-password__main-render'>
      <div>
        {Svg({ type: "padlock", width: 16, height: 16 })}
        <span>********</span>
      </div>
    </div>
  );
}

export default Render;