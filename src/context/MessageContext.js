import React from "react";

const MessageContext = React.createContext({
  messageContent: null,
  showSuccessMessage: () => {},
  showErrorMessage: () => {},
});

export default MessageContext;