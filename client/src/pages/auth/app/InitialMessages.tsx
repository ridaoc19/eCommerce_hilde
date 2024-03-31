import { useContext } from "react";
import ErrorMessage from "../../../components/common/ErrorMessage/ErrorMessage";
import { CreateContext } from "../../../hooks/useContext";

function InitialMessages() {
  const { messages: { messagesContextState } } = useContext(CreateContext)

  return (
    <>
      {messagesContextState.messages.length > 0 && <ErrorMessage messages={messagesContextState.messages} />}
    </>
  );
}

export default InitialMessages;