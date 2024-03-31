import Input from "../Input/Input";


function Search() {
  return (
    <div>
      <Input
        // svg={{ type: item }}
        styleClass={`login__account-info--`}
        errorMessage={""}
        input={{
          type: '',
          placeholder: '',
          handleOnChange: () => { },
          name: '',
          value: ''
        }}
      />
    </div>
  );
}

export default Search;