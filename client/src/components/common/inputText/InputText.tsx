// import './inputText.scss'

export interface InputTextProps {
  placeholder: string;
  handleChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  name: string;
}

function InputText({ name, placeholder, handleChange, value }: InputTextProps) {
  return (
    <div className="input-text__container">
      <span >
        <input type="text" name={name} placeholder={placeholder} onChange={handleChange} value={value} />
      </span>
    </div>
  );
}

export default InputText;
