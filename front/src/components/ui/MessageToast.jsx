import React from "react";

function MessageToast(props){
    return(
        <div className={`toast align-items-center text-bg-${props.typeOf} border-0 show bottom-0 end-0`} role="status" aria-live="polite" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              {props.text}.
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
    );
}

export default MessageToast;