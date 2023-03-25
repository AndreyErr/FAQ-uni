import React from "react";
import ReactMarkdown from 'react-markdown'

function MesLoockLike(props){
    return(
        <div className="mb-3 mt-3 bg-light rounded border text-dark p-2">
          <span className="d-flex me-md-auto text-decoration-none">
            <span className="fs-5 mt-1">Как текст будет выглядеть:</span>
          </span>
          <hr className="mt-1 mb-1"></hr>
          <span><ReactMarkdown>{props.text}</ReactMarkdown></span>
        </div>
    );
}

export default MesLoockLike;