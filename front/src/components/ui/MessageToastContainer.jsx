import React from "react";
import MessageToast from "./MessageToast";

function MessageToastContainer(props){
    let i = 0
    return(
        <div className="toast-container p-3 mb-5 position-fixed bottom-0 end-0 z-index-1000">
          {props.messages.map(message => 
                <MessageToast key={i++} typeOf={'danger'} text={message} />
            )}
        </div>
    );
}

export default MessageToastContainer;