import { useContext } from "react";
import MessageContext from "../context/MessageContext";

function useMessage() {
  const { messageContent, showSuccessMessage, showErrorMessage } =
    useContext(MessageContext);
  return {
    messageContent,
    showSuccessMessage,
    showErrorMessage,
  };
}

export default useMessage;